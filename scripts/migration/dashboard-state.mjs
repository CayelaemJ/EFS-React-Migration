import { parse } from "@babel/parser";
import traverseModule from "@babel/traverse";
import generateModule from "@babel/generator";
const traverse = traverseModule.default,
  generate = generateModule.default;
export function migrateDashboardState(source) {
  const obsolete = new Set([
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
  return (
    generate(ast, { comments: true }).code +
    `
configureDashboard({
 session(me){window.__ME__=me;applyTheme(me.theme,me);window.EmpowerPortalNav?.render({me,navSelector:'#portal-nav',accountSelector:'#portal-account',active:'dashboard',includeDashboard:false});},
 publish(value,query,live){
  if(live){DATA=value;BASE=JSON.parse(JSON.stringify(value));applyTheme(value.theme,window.__ME__);}
  window.__LIVE__=live;syncStateFromUrl();applyState();return DATA;
 },
 portfolio(value){if(value&&Array.isArray(value.employers)){PORTFOLIO.employers=value.employers;PORTFOLIO.filterContext=value.filterContext||null;PORTFOLIO.live=true;PORTFOLIO.error=false;}else{PORTFOLIO.live=false;PORTFOLIO.error=true;if(!PORTFOLIO.explicitDemo)PORTFOLIO.employers=[];}renderPortfolio();},
 preparePrint:preparePdfPrint
});
`
  );
}
