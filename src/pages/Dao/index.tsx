import Proposals from "./Proposals"
import BackButton from "@pages/AuthorProfile/BackButton"

const Dao = () => {
  return (
    <div className="mx-auto min-h-dvh max-w-[1024px] px-4 pb-20 pt-14 md:p-6 md:pt-0">
      <BackButton className="fixed left-0 top-0 h-[50px] pl-4 max-md:h-[40px] max-md:w-full max-md:bg-white" />
      <Proposals />
    </div>
  )
}

export default Dao
