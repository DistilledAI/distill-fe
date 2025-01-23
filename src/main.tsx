import { CloseFilledIcon } from "@components/Icons/DefiLens/index.tsx"
import "@rainbow-me/rainbowkit/styles.css"
import * as Sentry from "@sentry/react"
import Providers from "Providers.tsx"
import React from "react"
import ReactDOM from "react-dom/client"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "regenerator-runtime/runtime"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import App from "./App.tsx"
import "./index.css"

const sentryDSN =
  "https://5b7d7a06ec6e48a09991a984f4b02e86@o1323226.ingest.us.sentry.io/4508475831418880"
const urlStaging = ["mesh-distilled-ai-dev.web.app", "localhost:5173"]
const isStaging = urlStaging.includes(window.location.host)

Sentry.init({
  dsn: sentryDSN,
  integrations: [],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["https://mesh.distilled.ai/"],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enabled: !isStaging,
  ignoreErrors: [
    "Non-Error exception captured",
    "Non-Error promise rejection captured",
  ],
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
      <ToastContainer
        toastClassName="rounded-[14px] text-14 font-medium  bg-mercury-30"
        closeButton={<CloseFilledIcon size={18} />}
        bodyClassName="text-14 font-medium flex items-center"
        hideProgressBar={true}
        autoClose={2000}
      />
    </Providers>
  </React.StrictMode>,
)
