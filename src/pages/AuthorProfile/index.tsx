import PublicAgents from "./PublicAgents"
import AuthorInfo from "./AuthorInfo"
import HeaderBack from "@components/Layout/Header/HeaderBack"

const AuthorProfile = () => {
  return (
    <>
      <HeaderBack />
      <div className="space-y-2">
        <AuthorInfo />
        <PublicAgents />
      </div>
    </>
  )
}

export default AuthorProfile
