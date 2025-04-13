// eslint.config.js
import eslint from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import tseslint from "typescript-eslint"

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "@next/next": nextPlugin,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
        },
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-duplicate-enum-values": "off",
            "@typescript-eslint/no-unused-vars": ["warn"],
            semi: "off",
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "public/**",
            "next.config.js",
            "postcss.config.js",
            "prettier.config.js",
        ],
    },
]
