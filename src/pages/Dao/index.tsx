import Proposals from "./Proposals"
import BackButton from "@pages/AuthorProfile/BackButton"

const Dao = () => {
  return (
    <div className="mx-auto max-w-[844px] p-6">
      <BackButton className="fixed left-0 top-0 h-[50px] max-md:h-[40px] max-md:w-full max-md:bg-white" />
      <Proposals />
    </div>
  )
}

export default Dao
