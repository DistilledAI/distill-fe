import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"

const PrivateAgentPod = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[22px] border-1 border-white bg-mercury-30 p-4">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-mercury-950">
          My Private Agent pod:
        </span>
        <div className="flex items-center gap-1 font-medium text-brown-10">
          <FilledShieldCheckedIcon color="#A2845E" />
          AUDITED
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">Security level:</span>
        <div className="flex items-center gap-2 font-medium text-green-10">
          <div className="flex w-[13px] flex-col gap-[1px]">
            <span className="h-[1px] w-full bg-green-10"></span>
            <span className="h-[2px] w-full bg-green-10"></span>
            <span className="h-[3px] w-full bg-green-10"></span>
            <span className="h-[4px] w-full bg-green-10"></span>
          </div>
          HIGH
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">IP Address:</span>
        <span className="text-mercury-900">203.0.11.23</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">Data center:</span>
        <span className="text-mercury-900">Amazon Web Services (AWS)</span>
      </div>
      <div className="flex items-start justify-between">
        <span className="text-mercury-600">Storage:</span>
        <div className="mt-3 flex w-[70%] flex-col items-end">
          <div className="relative mb-2 h-[2px] w-full rounded-full bg-mercury-100">
            <div
              style={{ width: "10%" }}
              className="absolute left-0 top-0 h-full bg-mercury-950"
            ></div>
          </div>
          <span className="text-mercury-900">12GB/200GB</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">RAM:</span>
        <span className="text-mercury-900">245GB</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">CPU:</span>
        <span className="text-mercury-900">24 cores or 3.2 GHz</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-mercury-600">GPU:</span>
        <span className="text-mercury-900">94GB VRAM (RTX3090)</span>
      </div>
    </div>
  )
}

export default PrivateAgentPod
