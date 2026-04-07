import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OpenChatWukongimAdapter',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['wukongimjssdk'],
      output: {
        globals: {
          wukongimjssdk: 'WukongIM',
        },
      },
    },
    sourcemap: true,
  },
  plugins: [
    dts({
      include: ['src'],
      outDir: 'dist',
      tsconfigPath: resolve(__dirname, 'tsconfig.build.json'),
    }),
  ],
});
