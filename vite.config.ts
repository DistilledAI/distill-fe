import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import babel from "vite-plugin-babel"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(() => {
  return {
    root: ".",
    plugins: [react(), tsconfigPaths(), babel()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
})
