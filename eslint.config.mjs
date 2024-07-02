import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import eslintComments from 'eslint-plugin-eslint-comments'
import reactRefresh from 'eslint-plugin-react-refresh'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/node_modules', '**/dist'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:storybook/recommended',
    ),
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'no-only-tests': noOnlyTests,
      'eslint-comments': eslintComments,
      'react-refresh': reactRefresh,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'module',

      globals: {
        ...globals.browser,
      },

      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: '.',
      },
    },

    rules: {
      'prefer-const': 'warn',
      'no-console': 'warn',
      'no-debugger': 'warn',

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-useless-empty-export': 'warn',
      'no-only-tests/no-only-tests': 'warn',
      'eslint-comments/no-unused-disable': 'warn',
    },
  },
]
