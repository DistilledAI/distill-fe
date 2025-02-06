import useAuthAction from "@hooks/useAuthAction"
import useFetchMyAgent from "@hooks/useFetchMyAgent"
import { getAccessToken } from "@utils/storage"
import Owallet from "lib/owallet"
import mixpanel from "mixpanel-browser"
import { lazy, Suspense, useEffect } from "react"
import AppRouter from "./routes/AppRouter"

const EarnedPointToast = lazy(() => import("@components/EarnedPointToast"))
const MediaPreview = lazy(() => import("@components/MediaPreview"))
const JoinCreatorGroupAnnounce = lazy(
  () => import("@components/JoinCreatorGroupAnnounce"),
)

const mixpanelToken = import.meta.env.VITE_APP_MIXPANEL_TOKEN
const envMode = import.meta.env.VITE_APP_ENV_MODE

function App() {
  const { logout } = useAuthAction()
  useFetchMyAgent()

  const initMixpanel = () => {
    if (envMode === "production" && mixpanelToken) {
      mixpanel.init(mixpanelToken, {
        debug: false,
        track_pageview: false,
        persistence: "localStorage",
      })
    }
  }

  useEffect(() => {
    initMixpanel()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const accessToken = getAccessToken()
      if (!accessToken) logout()
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    //@ts-ignore
    if (!window.Owallet) {
      //@ts-ignore
      window.Owallet = new Owallet("owallet")
    }
  }, [])

  return (
    <>
      <AppRouter />
      <Suspense fallback={null}>
        <EarnedPointToast />
        <MediaPreview />
      </Suspense>
      <Suspense fallback={null}>
        <JoinCreatorGroupAnnounce />
      </Suspense>
    </>
  )
}

export default App
