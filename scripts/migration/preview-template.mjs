import { parseFragment } from "parse5";
import generateModule from "@babel/generator";
import * as t from "@babel/types";
const generate = generateModule.default;
const code = (node) => generate(node).code;
function expression(node) {
  if (t.isCallExpression(node) && t.isIdentifier(node.callee, { name: "esc" }))
    return code(node.arguments[0]);
  if (
    t.isCallExpression(node) &&
    t.isMemberExpression(node.callee) &&
    t.isIdentifier(node.callee.property, { name: "join" })
  ) {
    const map = node.callee.object;
    if (
      t.isCallExpression(map) &&
      t.isMemberExpression(map.callee) &&
      t.isIdentifier(map.callee.property, { name: "map" })
    ) {
      const fn = map.arguments[0],
        params = fn.params.map(code),
        index = params[1] || "nativeIndex";
      if (params.length === 1) params.push(index);
      return `${code(map.callee.object)}.map((${params.join(",")})=><React.Fragment key={${index}}>${compilePreviewTemplate(fn.body)}</React.Fragment>)`;
    }
  }
  return code(node);
}
export function compilePreviewTemplate(template) {
  const expressions = template.expressions.map(expression);
  const html = template.quasis
    .map(
      (part, i) =>
        part.value.cooked +
        (i < expressions.length ? `NATIVE_PREVIEW_${i}_END` : ""),
    )
    .join("");
  const split = (value) =>
    value
      .split(/(NATIVE_PREVIEW_\d+_END)/)
      .filter(Boolean)
      .map((part) => {
        const match = part.match(/^NATIVE_PREVIEW_(\d+)_END$/);
        return match ? { code: expressions[Number(match[1])] } : { text: part };
      });
  const attr = (value) =>
    split(value)
      .map((part) => (part.code ? `(${part.code})` : JSON.stringify(part.text)))
      .join(" + ") || '""';
  function jsx(node) {
    if (node.nodeName === "#text")
      return split(node.value)
        .map((part) => `{${part.code || JSON.stringify(part.text)}}`)
        .join("");
    if (!node.tagName) return "";
    let attrs = "";
    for (const { name, value } of node.attrs) {
      if (name === "style") {
        const styles = value
          .split(";")
          .filter((part) => part.includes(":"))
          .map((part) => {
            const i = part.indexOf(":");
            const key = part
              .slice(0, i)
              .trim()
              .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            return `${JSON.stringify(key)}:${attr(part.slice(i + 1).trim())}`;
          });
        attrs += ` style={{${styles.join(",")}}}`;
      } else
        attrs += ` ${name === "class" ? "className" : name}={${attr(name === "class" && node.attrs.some((a) => a.name === "style" && a.value.includes("background:#fff")) ? value + " preview-surface" : value)}}`;
    }
    const children = (node.childNodes || []).map(jsx).join("");
    return children
      ? `<${node.tagName}${attrs}>${children}</${node.tagName}>`
      : `<${node.tagName}${attrs}/>`;
  }
  return parseFragment(html).childNodes.map(jsx).join("");
}
