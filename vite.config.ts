import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
// import {} from "quasar";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true
    })
  ],
  server: {
    port: 8181
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'gen-form-lib',
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `gen-form-lib.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue','quasar'],
      output: {
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          quasar: 'Quasar',
        },
      },
    },
  }
})
