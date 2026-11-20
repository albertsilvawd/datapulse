import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const prettier = await import('eslint-config-prettier/flat')
  .then((module) => module.default)
  .catch((error) => {
    if (error.code === 'ERR_MODULE_NOT_FOUND' && error.message.includes('eslint-config-prettier')) {
      return undefined;
    }

    throw error;
  });

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...(prettier ? [prettier] : []),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
