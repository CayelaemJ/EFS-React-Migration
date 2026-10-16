import fs from "node:fs";
import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import generateModule from "@babel/generator";
const traverse = traverseModule.default,
  generate = generateModule.default;
export function migrateDashboardState(source) {
  const obsolete = new Set([
    "preparePdfPrint",
    "populateEmployerSelect",
    "wireMetricTips",
    "pfShowMetricTip",
    "pfHideMetricTip",
    "pfMetricTooltip",
    "fitResponsiveDataValues",
    "saveCurrentView",
    "openToast",
    "openQuickActions",
    "openScheduleReport",
    "loadLiveData",
    "fetchPortfolioInBackground",
    "populateMonthSelect",
    "switchPeriod",
    "switchEmployer",
    "switchFilter",
    "apiFilterQuery",
    "renderMonthActivity",
    "renderDataQuality",
    "setLiveFootnote",
    "renderRefreshStatus",
    "showLiveError",
    "applySyntheticDataNotice",
    "showDemoBanner",
    "checkSourceVersion",
    "wireFilters",
    "buildDropdown",
    "syncPeriodControl",
    "updatePeriodControlTone",
    "periodScoreTone",
    "updateContextLine",
    "wireAudience",
    "wireHeaderBtns",
    "handleWelcomeSplash",
    "addAuthBar",
    "applySectionVisibility",
  ]);
  const ast = parse(source, { sourceType: "script" });
  traverse(ast, {
    FunctionDeclaration(path) {
      if (obsolete.has(path.node.id?.name)) {
        path.remove();
        return;
      }
    },
    VariableDeclaration(path) {
      if (
        path.node.declarations.every((d) =>
          [
            "toastT",
            "LIVE_REQUEST_SEQ",
            "PF_RENDERED",
            "PERIOD_SCORE_TONE",
            "__SOURCE_VERSION__",
            "__SOURCE_REFRESH_BUSY__",
          ].includes(d.id.name),
        )
      )
        path.remove();
    },
    ExpressionStatement(path) {
      const code = generate(path.node).code;
      if (
        path.parent.type === "Program" &&
        (/^(loadLiveData\(|setInterval\(checkSourceVersion)/.test(code) ||
          code.includes("document.getElementById('footnote').innerHTML") ||
          (code.includes("'DOMContentLoaded'") &&
            code.includes("'btn-save-view'")))
      ) {
        path.remove();
        return;
      }
      if (
        path.node.expression.type === "CallExpression" &&
        path.node.expression.callee.name === "updateContextLine"
      )
        path.remove();
    },
    Statement(path) {
      const fn = path.getFunctionParent();
      if (fn?.node.id?.name === "applyState") {
        if (
          (path.isVariableDeclaration() &&
            path.node.declarations.every((d) =>
              ["siteLabel", "incomeLabel"].includes(d.id.name),
            )) ||
          (path.isIfStatement() &&
            ["siteLabel", "incomeLabel"].includes(path.node.test.name))
        )
          path.remove();
      }
    },
    IfStatement(path) {
      const fn = path.getFunctionParent();
      if (
        ["restoreDefaultPortalIdentity", "applyTheme"].includes(
          fn?.node.id?.name,
        )
      ) {
        if (
          path.node.test.name === "sub" ||
          (path.node.test.type === "MemberExpression" &&
            path.node.test.object.name === "theme" &&
            path.node.test.property.name === "tagline")
        )
          path.remove();
      }
    },
  });
  return compileModel(generate(ast, { comments: true }).code);
}

function compileModel(source) {
  const input = parse(source, { sourceType: "script" });
  // Only the source calculation declarations survive. React owns every UI effect.
  input.program.body = input.program.body.filter(
    (n) => n.type === "FunctionDeclaration" || n.type === "VariableDeclaration",
  );
  const removed = new Set([
    "applyTheme",
    "restoreDefaultPortalIdentity",
    "applyDefaultPortalTheme",
    "applyPartnerHeaderLogoMode",
    "clearEmployerScopedTheme",
    "applyEmployerScopedTheme",
    "installMoneyFormatter",
    "pfInfoButton",
    "pfMetricInfo",
    "rangeFromUrl",
    "clamp01",
  ]);
  input.program.body = input.program.body.filter(
    (n) => n.type !== "FunctionDeclaration" || !removed.has(n.id.name),
  );
  input.program.body = input.program.body.filter(
    (n) =>
      n.type !== "VariableDeclaration" ||
      !n.declarations.some((d) => ["BrandTheme", "pfEsc"].includes(d.id.name)),
  );
  traverse(input, {
    ExpressionStatement(p) {
      const code = generate(p.node).code;
      if (
        /wireMetricTips|fitResponsiveDataValues/.test(code) &&
        p.getFunctionParent()?.node.id?.name === "applyState"
      )
        p.remove();
    },
    MemberExpression(p) {
      if (
        p.node.object.name === "window" &&
        p.node.property.name === "__LIVE__"
      )
        p.replaceWith({ type: "Identifier", name: "live" });
    },
  });
  const definitions = input.program.body.filter(
    (n) =>
      n.type === "VariableDeclaration" &&
      n.declarations.some((d) =>
        ["EMPLOYER_METRIC_INFO", "PORTFOLIO_METRIC_INFO"].includes(d.id.name),
      ),
  );
  input.program.body = input.program.body.filter(
    (n) => !definitions.includes(n),
  );
  fs.writeFileSync(
    "frontend/src/native/dashboard-metrics.js",
    definitions.map((n) => "export " + generate(n).code).join("\n"),
  );
  const api = `let live=false;return {
 session(me){window.__ME__=me;window.EmpowerPortalNav?.render({me,navSelector:'#portal-nav',accountSelector:'#portal-account',active:'dashboard',includeDashboard:false});},
 publish(value,query,isLive){live=isLive;if(live){DATA=value;BASE=JSON.parse(JSON.stringify(value));}const params=new URLSearchParams(query);STATE.period=params.get('range')==='30d'?'30':params.get('range')==='quarter'?'q':'all';STATE.region=params.get('site')||'all';STATE.income=params.get('income')||'all';applyState();return DATA;},
 portfolio(value){if(value&&Array.isArray(value.employers)){PORTFOLIO.employers=value.employers;PORTFOLIO.filterContext=value.filterContext||null;PORTFOLIO.live=true;PORTFOLIO.error=false;}else{PORTFOLIO.live=false;PORTFOLIO.error=true;if(!PORTFOLIO.explicitDemo)PORTFOLIO.employers=[];}renderPortfolio();}
 };`;
  const model = parse(
    "export function createDashboardModel(){" +
      generate(input, { comments: false }).code.replaceAll(
        "requestAnimationFrame(() => fitResponsiveDataValues())",
        "fitResponsiveDataValues()",
      ) +
      api +
      "}",
    { sourceType: "module" },
  );
  // Remove unused source helpers and HTML-producing functions, including cycles.
  let changed = true;
  while (changed) {
    changed = false;
    traverse(model, {
      FunctionDeclaration(p) {
        if (
          p.node.id.name !== "createDashboardModel" &&
          !p.scope.parent.getBinding(p.node.id.name)?.referenced
        ) {
          p.remove();
          changed = true;
        }
      },
      VariableDeclarator(p) {
        if (!p.scope.getBinding(p.node.id.name)?.referenced) {
          p.remove();
          changed = true;
        }
      },
    });
  }
  fs.writeFileSync(
    "frontend/src/native/dashboard-model.js",
    `// Source data and demo calculations; no DOM controllers. Generated by migration:generate.\nimport {updatePortfolio} from './Portfolio.jsx';\nimport {updateWellness} from './Wellness.jsx';\nimport {updateEmployerCharts} from './EmployerCharts.jsx';\nimport {updateEmployerOverview} from './EmployerOverview.jsx';\nimport {EMPLOYER_METRIC_INFO,PORTFOLIO_METRIC_INFO} from './dashboard-metrics.js';\nimport {scheduleDashboardFit as fitResponsiveDataValues} from './dashboard-layout.js';\n` +
      generate(model, { comments: false }).code,
  );
  return "";
}
