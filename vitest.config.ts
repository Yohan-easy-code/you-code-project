import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // important pour React / Next
    globals: true, // permet d'utiliser describe/test sans import
  },
});
