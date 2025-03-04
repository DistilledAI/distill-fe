import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { useAppSelector } from "@hooks/useAppRedux"
import { lazy } from "react"
const CreateAgent = lazy(() => import("./CreateAgent"))
const CurrentAgent = lazy(() => import("./CurrentAgent"))

const MyAgent = () => {
  const myAgent = useAppSelector((state) => state.agents.myAgent)

  return (
    <div className="mt-8 max-md:mt-5">
      {myAgent ? <CurrentAgent /> : <CreateAgent />}

      <div className="mt-6 flex items-center justify-between">
        <span className="text-base-b text-14 text-mercury-950">
          My Private Agent pod:
        </span>
        <div className="flex items-center gap-1 font-medium text-brown-10 max-md:text-14">
          <FilledShieldCheckedIcon color="#A2845E" />
          AUDITED
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-mercury-900 max-md:text-14">
          Confidential Computing (CC)
        </span>
        <div className="flex items-center gap-2 font-medium text-green-10 max-md:text-14">
          <div className="flex w-[13px] flex-col gap-[1px]">
            <span className="h-[1px] w-full bg-green-10"></span>
            <span className="h-[2px] w-full bg-green-10"></span>
            <span className="h-[3px] w-full bg-green-10"></span>
            <span className="h-[4px] w-full bg-green-10"></span>
          </div>
          SECURE
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-mercury-900 max-md:text-14">
          Trusted Execution Environment (TEE)
        </span>
        <div className="flex items-center gap-2 font-medium text-green-10 max-md:text-14">
          <div className="flex w-[13px] flex-col gap-[1px]">
            <span className="h-[1px] w-full bg-green-10"></span>
            <span className="h-[2px] w-full bg-green-10"></span>
            <span className="h-[3px] w-full bg-green-10"></span>
            <span className="h-[4px] w-full bg-green-10"></span>
          </div>
          SECURE
        </div>
      </div>
    </div>
  )
}

export default MyAgent
