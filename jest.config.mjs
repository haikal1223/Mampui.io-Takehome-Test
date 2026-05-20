import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  setupFiles: ["<rootDir>/jest.polyfills.cjs"],
  setupFilesAfterEnv: [
    "<rootDir>/test/mocks/next-navigation.ts",
    "<rootDir>/jest.setup.ts",
  ],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "!**/*.d.ts",
  ],
};

export default async function jestConfig() {
  const nextConfig = await createJestConfig(config)();
  return {
    ...nextConfig,
    transformIgnorePatterns: [
      "/node_modules/(?!(msw|@mswjs|rettime)/)",
      ...(nextConfig.transformIgnorePatterns ?? []).filter(
        (pattern) => !String(pattern).includes("msw"),
      ),
    ],
  };
}
