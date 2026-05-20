import "@testing-library/jest-dom";
import "@/test/setup-match-media";

if (typeof globalThis.fetch === "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- Jest setup polyfill
  require("whatwg-fetch");
}
