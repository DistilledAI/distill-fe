import { sentryVitePlugin } from "@sentry/vite-plugin"
import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"
import babel from "vite-plugin-babel"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import Sitemap from "vite-plugin-sitemap"
import tsconfigPaths from "vite-tsconfig-paths"
import { PATH_NAMES } from "./src/constants/index"

export default defineConfig(() => {
  const sentryAuthToken = ""

  return {
    root: ".",
    plugins: [
      react(),
      tsconfigPaths(),
      babel(),
      nodePolyfills(),
      Sitemap({
        hostname: "https://mesh.distilled.ai",
        dynamicRoutes: [
          PATH_NAMES.MARKETPLACE,
          PATH_NAMES.REWARDS,
          PATH_NAMES.CREATE_AGENT,
          PATH_NAMES.MY_AGENTS,
        ],
      }),
      sentryVitePlugin({
        org: "oraichain",
        project: "llm-layer-frontend",
        authToken: sentryAuthToken,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
})
