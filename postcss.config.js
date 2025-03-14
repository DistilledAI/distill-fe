const isProduction =
  process.env.VITE_BASE_API_URL === "https://prod-api.distilled.ai/distill"

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(isProduction && {
      cssnano: {
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            mergeRules: false,
          },
        ],
      },
    }),
  },
}
