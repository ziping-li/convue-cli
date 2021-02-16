import { defineConfig } from 'vite';
import convue from 'convue';

export default defineConfig({
  plugins: [
    ...convue({}),
  ],
});
