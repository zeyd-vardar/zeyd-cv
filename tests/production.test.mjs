import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

test("production route renders portfolio content and absolute social metadata", async () => {
  const response = await worker.fetch(
    new Request("https://portfolio.example/", { headers: { host: "portfolio.example" } }),
    { ASSETS: { fetch: async () => new Response("", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Zeyd Vardar/);
  assert.match(html, /https:\/\/portfolio\.example\/og\.png/);
  assert.match(html, /summary_large_image/);
  for (const section of ["home", "about", "projects", "skills", "contact"]) {
    assert.ok(html.includes(`id="${section}"`), `Missing section: ${section}`);
  }
});
