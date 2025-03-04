import { useEffect } from "react"

const XloginPage: React.FC = () => {
  useEffect(() => {
    const popupWindowURL = new URL(window.location.href)
    const oauthVerifier =
      popupWindowURL.searchParams.get("oauth_verifier") || ""
    const oauthToken = popupWindowURL.searchParams.get("oauth_token") || ""

    if (oauthVerifier && oauthToken) {
      localStorage.setItem(
        "verifyXLoginInfo",
        JSON.stringify({ oauthVerifier, oauthToken }),
      )
      localStorage.setItem("isVerifyXLoginSuccess", "1")
      window.close()
    }
  }, [])

  return <div />
}
export default XloginPage
