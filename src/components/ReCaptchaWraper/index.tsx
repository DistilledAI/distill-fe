import { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

const ReCaptchaWraper: React.FC<{
  reCaptchaRef: any
}> = ({ reCaptchaRef }) => {
  const TEST_SITE_KEY = "6LemT5gqAAAAAG0i_Vq4l8HRaW-3BfW_z3Syld3t"
  const DELAY = 1500

  const [captchaInfo, setCaptchaInfo] = useState<any>({
    callback: "not fired",
    value: "[empty]",
    load: false,
    expired: "false",
    recaptchaLoaded: false,
  })

  useEffect(() => {
    setTimeout(() => {
      setCaptchaInfo({ ...captchaInfo, load: true })
    }, DELAY)
  }, [])

  const handleChange = (value: any) => {
    setCaptchaInfo({ ...captchaInfo, value })
    if (value === null) setCaptchaInfo({ ...captchaInfo, expired: "true" })
  }

  const asyncScriptOnLoad = () => {
    setCaptchaInfo({
      ...captchaInfo,
      callback: "called!",
      recaptchaLoaded: true,
    })
  }

  return (
    <ReCAPTCHA
      style={{
        display: "inline-block",
        // visibility: "hidden"
      }}
      theme="dark"
      size="invisible"
      ref={reCaptchaRef}
      sitekey={TEST_SITE_KEY}
      onChange={handleChange}
      asyncScriptOnLoad={asyncScriptOnLoad}
    />
  )
}
export default ReCaptchaWraper
