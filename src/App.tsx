import mixpanel from "mixpanel-browser"
import { useEffect } from "react"
import { getAccessToken } from "@utils/storage"
import AppRouter from "./routes/AppRouter"
import useAuthAction from "@hooks/useAuthAction"
import EarnedPointToast from "@components/EearnedPointToast"

const mixpanelToken = import.meta.env.VITE_APP_MIXPANEL_TOKEN
const envMode = import.meta.env.VITE_APP_ENV_MODE

function App() {
  const { logout } = useAuthAction()

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
    </>
  )
}

export default App
