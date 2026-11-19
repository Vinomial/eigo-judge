// 画面のテスト用の道具:アプリを配る小さなサーバーと,ヘッドレスの Chromium.
// Chromium が見つからなければ `npm run browser` で入れる(playwright のキャッシュに入る).
"use strict";
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const ROOT = path.join(__dirname, "..");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json" };

// アプリのフォルダを配る.{ url, close }
function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      const p = decodeURIComponent(req.url.split("?")[0]);
      const file = path.join(ROOT, p === "/" ? "index.html" : p);
      if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
      fs.createReadStream(file).pipe(res);
    });
    srv.listen(0, "127.0.0.1", () => resolve({ url: `http://127.0.0.1:${srv.address().port}/`, close: () => srv.close() }));
  });
}

// Chromium の実行ファイルを探す(環境変数 CHROME_PATH → playwright-core の既定 → キャッシュの中の新しいもの)
function chromePath() {
  const { chromium } = require("playwright-core");
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  try { const p = chromium.executablePath(); if (p && fs.existsSync(p)) return p; } catch (e) { /* 次へ */ }
  const cache = path.join(os.homedir(), ".cache", "ms-playwright");
  const dirs = fs.existsSync(cache) ? fs.readdirSync(cache).filter(d => /^chromium-\d+$/.test(d)).sort((a, b) => +b.split("-")[1] - +a.split("-")[1]) : [];
  for (const d of dirs) for (const sub of ["chrome-linux64/chrome", "chrome-linux/chrome", "chrome-mac/Chromium.app/Contents/MacOS/Chromium", "chrome-win/chrome.exe"]) {
    const p = path.join(cache, d, sub);
    if (fs.existsSync(p)) return p;
  }
  throw new Error("Chromium が見つかりません.`npm run browser` で入れるか,環境変数 CHROME_PATH を指定してください.");
}
async function launch() {
  const { chromium } = require("playwright-core");
  return chromium.launch({ executablePath: chromePath(), args: ["--no-sandbox"] });
}

// 小さなテストの枠組み.test(名前, async 関数) を並べて run() で実行する
function suite(title) {
  const tests = [];
  return {
    test: (name, fn) => tests.push({ name, fn }),
    async run(ctx) {
      let ok = 0, ng = 0;
      console.log(title);
      for (const t of tests) {
        try { await t.fn(ctx); ok++; console.log("  ok   " + t.name); }
        catch (e) { ng++; console.log("  FAIL " + t.name + "\n       " + String(e && e.message || e).split("\n").join("\n       ")); }
      }
      console.log(`\n${ok} 件合格,${ng} 件失敗`);
      return ng;
    }
  };
}

module.exports = { serve, launch, suite, ROOT };
