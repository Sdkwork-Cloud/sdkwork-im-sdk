import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OpenChatImSdk',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['@sdkwork/im-backend-sdk', '@openchat/sdkwork-im-wukongim-adapter'],
      output: {
        globals: {
          '@sdkwork/im-backend-sdk': 'SdkworkImBackendSdk',
          '@openchat/sdkwork-im-wukongim-adapter': 'OpenChatWukongimAdapter',
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
