import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import babel from "vite-plugin-babel"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(() => {
  return {
    root: ".",
    plugins: [
      react(),
      tsconfigPaths(),
      babel(),

      // babel({
      //   babelConfig: {
      //     babelrc: false,
      //     configFile: false,
      //     plugins: ["@babel/plugin-transform-runtime"],
      //   },
      // }),
      // legacy({
      //   targets: ["defaults", "not IE 11"],
      //   additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      // }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
})
