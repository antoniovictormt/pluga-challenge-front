import type { Config } from "jest"
import nextJest from "next/jest"

const createJestConfig = nextJest({
    dir: "./"
})

const config: Config = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.ts(x)?",
        "!src/**/**/type(s)?.ts",
        "!src/**/**/schema.ts",
        "!src/app/layout.tsx"
    ],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
}

export default createJestConfig(config)
