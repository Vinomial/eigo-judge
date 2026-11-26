// ESLint の設定(npm run lint).アプリはビルドせず,js/ のファイルが同じ大域の名前を共有するので,
// index.html の <script> の順に各ファイルの一番外側の宣言(と window.X = ...)を集め,ほかのファイルから見える名前として渡す.
// これで「どのファイルにも宣言のない名前」(打ち間違い)を no-undef で見つけられる.
"use strict";
const fs = require("fs");
const path = require("path");
const espree = require("espree");
const globals = require("globals");

const ROOT = __dirname;
const SCRIPTS = [...fs.readFileSync(path.join(ROOT, "index.html"), "utf8").matchAll(/<script src="([^"?]+)/g)].map(m => m[1]);

// 一番外側の宣言と,どこかで window.X = ... と置いた名前
function declared(file) {
  const ast = espree.parse(fs.readFileSync(path.join(ROOT, file), "utf8"), { ecmaVersion: 2022, sourceType: "script" });
  const names = new Set();
  const addPat = p => {
    if (!p) return;
    if (p.type === "Identifier") names.add(p.name);
    else if (p.type === "ObjectPattern") p.properties.forEach(x => addPat(x.type === "RestElement" ? x.argument : x.value));
    else if (p.type === "ArrayPattern") p.elements.forEach(addPat);
    else if (p.type === "AssignmentPattern") addPat(p.left);
  };
  for (const n of ast.body) {
    if (n.type === "VariableDeclaration") n.declarations.forEach(d => addPat(d.id));
    else if ((n.type === "FunctionDeclaration" || n.type === "ClassDeclaration") && n.id) names.add(n.id.name);
  }
  (function walk(n) {
    if (!n || typeof n.type !== "string") return;
    if (n.type === "AssignmentExpression" && n.left.type === "MemberExpression" && !n.left.computed
      && n.left.object.type === "Identifier" && /^(window|root)$/.test(n.left.object.name)) names.add(n.left.property.name);
    for (const k of Object.keys(n)) {
      const v = n[k];
      if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === "object" && k !== "parent") walk(v);
    }
  })(ast);
  return names;
}
const DECL = new Map(SCRIPTS.map(f => [f, declared(f)]));
// そのファイル以外で宣言された名前(自分の宣言を渡すと no-redeclare になるため除く)
const others = file => {
  const g = {};
  for (const [f, names] of DECL) if (f !== file) names.forEach(n => { g[n] = "writable"; });
  for (const n of DECL.get(file) || []) delete g[n];
  return g;
};

const RULES = {
  "no-undef": "error",
  "no-unused-vars": ["error", { vars: "local", args: "none", caughtErrors: "none" }],
  "no-redeclare": "error",
  "no-dupe-keys": "error",
  "no-unreachable": "error",
  "no-self-assign": "error",
  "no-cond-assign": ["error", "except-parens"],
  "no-constant-condition": ["error", { checkLoops: false }],
  "use-isnan": "error",
  "valid-typeof": "error",
  eqeqeq: ["error", "smart"]
};

module.exports = [
  { ignores: ["node_modules/**", "test-results/**"] },
  // アプリ(ブラウザで <script> として読み込む)
  ...SCRIPTS.map(file => ({
    files: [file],
    languageOptions: {
      ecmaVersion: 2022, sourceType: "script",
      // rating.js などは node でも require できるよう module を見る
      globals: { ...globals.browser, ...others(file), module: "readonly", require: "readonly" }
    },
    rules: RULES
  })),
  // 道具とテスト(node で動かす).ページの中で動かす関数(p.evaluate)はアプリの名前を使うので,アプリの名前も渡す
  {
    files: ["tools/**/*.js", "eslint.config.js"],
    languageOptions: { ecmaVersion: 2022, sourceType: "commonjs", globals: { ...globals.node, ...globals.browser, ...others(null) } },
    rules: { ...RULES, "no-unused-vars": ["error", { vars: "all", args: "none", caughtErrors: "none" }] }
  }
];
