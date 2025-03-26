import { PATH_NAMES } from "@constants/index"
import Proposals from "./Proposals"
import BackButton from "@pages/AuthorProfile/BackButton"
import { useNavigate, useLocation } from "react-router-dom"

const Dao = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    if (location.state?.isHistory) {
      navigate(-1)
    } else {
      navigate(PATH_NAMES.MY_AGENT_CLAN)
    }
  }

  return (
    <div className="mx-auto min-h-dvh max-w-[1024px] px-4 pb-20 pt-14 md:p-6 md:pt-0">
      <BackButton
        className="fixed left-0 top-0 h-[50px] pl-4 max-md:h-[40px] max-md:w-full max-md:bg-white"
        onClick={handleBack}
      />
      <Proposals />
    </div>
  )
}

export default Dao
