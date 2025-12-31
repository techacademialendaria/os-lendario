// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [{
  ignores: ['node_modules', 'dist', '.next', '.vercel', 'storybook-static', 'scripts'],
}, {
  files: ['**/*.{ts,tsx,js,jsx}'],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      console: 'readonly',
      process: 'readonly',
      Buffer: 'readonly',
      window: 'readonly',
      document: 'readonly',
      setTimeout: 'readonly',
      clearTimeout: 'readonly',
      setInterval: 'readonly',
      clearInterval: 'readonly',
      File: 'readonly',
      HTMLElement: 'readonly',
      HTMLInputElement: 'readonly',
      HTMLTextAreaElement: 'readonly',
      fetch: 'readonly',
      FormData: 'readonly',
      Blob: 'readonly',
      EventSource: 'readonly',
      __dirname: 'readonly',
      __filename: 'readonly',
    },
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tsPlugin.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn', // Strict in Story 0.2 (TypeScript strict mode)
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-object-type': 'warn', // Legitimate TypeScript pattern
    '@typescript-eslint/ban-ts-comment': 'off', // Allow @ts-ignore/@ts-nocheck for pragmatic type fixes
    'no-undef': 'warn', // Browser globals handled above
  },
}, ...storybook.configs["flat/recommended"]];
