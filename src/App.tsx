import EarnedPointToast from "@components/EearnedPointToast"
import MediaPreview from "@components/MediaPreview"
import useAuthAction from "@hooks/useAuthAction"
import useCheckWalletActive from "@hooks/useCheckWalletActive"
import useFetchMyAgent from "@hooks/useFetchMyAgent"
import { getAccessToken } from "@utils/storage"
import mixpanel from "mixpanel-browser"
import { useEffect } from "react"
import AppRouter from "./routes/AppRouter"

const mixpanelToken = import.meta.env.VITE_APP_MIXPANEL_TOKEN
const envMode = import.meta.env.VITE_APP_ENV_MODE

function App() {
  const { logout } = useAuthAction()
  useFetchMyAgent()
  useCheckWalletActive()

  const initMixpanel = () => {
    mixpanel.init(mixpanelToken, {
      debug: true,
      track_pageview: false,
      persistence: "localStorage",
    })
  }

  useEffect(() => {
    if (envMode === "production") {
      initMixpanel()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const accessToken = getAccessToken()
      if (!accessToken) logout()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <AppRouter />
      <EarnedPointToast />
      <MediaPreview />
    </>
  )
}

export default App
