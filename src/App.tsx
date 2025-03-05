import useAuthAction from "@hooks/useAuthAction"
import useFetchMyAgent from "@hooks/useFetchMyAgent"
import { getAccessToken } from "@utils/storage"
import Owallet from "lib/owallet"
import mixpanel from "mixpanel-browser"
import { lazy, Suspense, useEffect, useCallback } from "react"
import AppRouter from "./routes/AppRouter"

const EarnedPointToast = lazy(() => import("@components/EarnedPointToast"))
const MediaPreview = lazy(() => import("@components/MediaPreview"))
const JoinCreatorGroupAnnounce = lazy(
  () => import("@components/JoinCreatorGroupAnnounce"),
)
const ConnectWalletModal = lazy(() => import("@components/ConnectWalletModal"))

const mixpanelToken = import.meta.env.VITE_APP_MIXPANEL_TOKEN
const envMode = import.meta.env.VITE_APP_ENV_MODE
const storageKey = {
  ACCESS_TOKEN: "access_token",
}

interface AccessToken {
  token: string
  expiry: number
}

function App() {
  const { logout } = useAuthAction()
  useFetchMyAgent()

  const initMixpanel = useCallback(() => {
    if (envMode === "production" && mixpanelToken) {
      mixpanel.init(mixpanelToken, {
        debug: false,
        track_pageview: false,
        persistence: "localStorage",
      })
    }
  }, [])

  const checkTokenExpiration = useCallback(() => {
    const accessToken = getAccessToken() as AccessToken | null

    if (!accessToken) {
      logout()
      return
    }
  }, [])

  useEffect(() => {
    initMixpanel()
    checkTokenExpiration() // Initial check on mount
  }, [initMixpanel, checkTokenExpiration])

  useEffect(() => {
    //@ts-ignore
    if (!window.Owallet) {
      //@ts-ignore
      window.Owallet = new Owallet("owallet")
    }
  }, [])

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkTokenExpiration()
      }
    }

    // Handle window focus (when switching back to tab)
    const handleFocus = () => {
      checkTokenExpiration()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("focus", handleFocus)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("focus", handleFocus)
    }
  }, [checkTokenExpiration])

  // Handle storage events for cross-tab sync
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === storageKey.ACCESS_TOKEN && !getAccessToken()) {
        logout()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return (
    <>
      <AppRouter />
      <Suspense fallback={null}>
        <JoinCreatorGroupAnnounce />
        <ConnectWalletModal />
        <EarnedPointToast />
        <MediaPreview />
      </Suspense>
    </>
  )
}

export default App
