import { AliasOptions, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';

const getAlias = (aliases: string[]): AliasOptions =>
  aliases.map((alias) => ({
    find: alias,
    replacement: path.resolve(__dirname, 'src', alias),
  }));

const alias: AliasOptions = getAlias([
  'assets',
  'constants',
  'components',
  'variables',
  'enums',
  'forms',
  'helpers',
  'interfaces',
  'pages',
  'router',
  'types',
  'utils',
  'mocks',
]);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
  appType: 'spa',
});
