import assert from "node:assert/strict";
import test from "node:test";
import { readPreference, writePreference } from "../src/utils/storage.ts";

test("blocked browser storage does not prevent preferences from working", () => {
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      get localStorage() {
        throw new Error("Storage access denied");
      },
    },
  });
  try {
    assert.equal(readPreference("portfolio-theme"), null);
    assert.doesNotThrow(() => writePreference("portfolio-theme", "dark"));
  } finally {
    Reflect.deleteProperty(globalThis, "window");
  }
});
