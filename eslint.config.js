import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Ignora a pasta de build e backend
  {
    ignores: ['dist/**', 'node_modules/**', 'backend/**'],
  },

  // Configuração base do JS
  js.configs.recommended,

  // Configuração para arquivos JS/JSX
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    rules: {
      // ⚙️ Boas práticas e preferências
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' }],
      'react/react-in-jsx-scope': 'off', // Desnecessário no Vite/React 17+
      'react/prop-types': 'off', // Se não usa PropTypes
      'react/jsx-uses-react': 'off', // JSX automático
      'react/jsx-uses-vars': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
