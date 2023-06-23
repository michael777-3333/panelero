import { defineConfig } from 'vite';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    quasar({
      framework: { cssAddon: true },
      sassVariables: 'src/quasar-variables.sass',
    }),
  ]
});