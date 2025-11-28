// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import simpleImportSort from "eslint-plugin-simple-import-sort"

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        plugins: {
            "simple-import-sort": simpleImportSort
        },
        rules: {
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                    ignoreRestSiblings: true,
                    varsIgnorePattern: "^_"
                }
            ],
            "no-console": "error",
            semi: ["error", "never"],
            quotes: ["error", "double"],
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "import", next: "*" },
                { blankLine: "always", prev: "export", next: "*" },
                { blankLine: "always", prev: "const", next: "export" },
                { blankLine: "any", prev: "import", next: "import" }
            ]
        }
    },
    globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
])

export default eslintConfig
