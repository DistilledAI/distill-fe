import React from "react"
import AuthorAvatar from "./Avatar"
import AuthorDescription from "./Description"
import ShareProfile from "./ShareProfile"
import AuthorUsername from "./Username"

const AuthorProfile: React.FC = () => {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[22px] border-1 border-white bg-mercury-30 p-4 max-md:bg-white">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-mercury-950">
          Author profile:
        </span>
        <AuthorAvatar />
      </div>
      <AuthorUsername />
      <AuthorDescription />

      <div className="flex items-center justify-end">
        <div>
          <ShareProfile />
        </div>
      </div>
    </div>
  )
}

export default AuthorProfile
