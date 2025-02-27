import { DatabaseSearchIcon } from "@components/Icons/DatabaseImportIcon"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { PATH_NAMES } from "@constants/index"
import React from "react"
import { useNavigate } from "react-router-dom"

const AgentInfo: React.FC<{
  agent?: any
}> = ({ agent }) => {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-11 rounded-[22px] bg-mercury-30 p-4 max-md:grid-cols-1 max-md:gap-4 max-md:bg-white">
      <div className="col-span-5 flex flex-col gap-4 max-md:order-2">
        <div className="flex items-center justify-between">
          <span className="text-mercury-600">IP Address:</span>
          <span className="text-base-md">203.0.11.23</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-mercury-600">Data center:</span>
          <span className="text-base-md">Amazon Web Services (AWS)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-mercury-600">RAM:</span>
          <span className="text-base-md">256GB</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-mercury-600">CPU:</span>
          <span className="text-base-md">24 cores or 3.2GHz</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-mercury-600">GPU:</span>
          <span className="text-base-md">94GB VRAM(RTX3090)</span>
        </div>
      </div>

      <div className="col-span-1 flex justify-center">
        <div className="my-2 h-full w-[1px] bg-mercury-100" />
      </div>

      <div className="col-span-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-base-b text-mercury-950">
            My Private Agent pod:
          </span>
          <div className="flex items-center gap-1 font-medium text-brown-10">
            <FilledShieldCheckedIcon color="#A2845E" />
            AUDITED
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-mercury-600">Confidential Computing (CC)</span>
          <div className="flex items-center gap-2 font-medium text-green-10">
            <div className="flex w-[13px] flex-col gap-[1px]">
              <span className="h-[1px] w-full bg-green-10"></span>
              <span className="h-[2px] w-full bg-green-10"></span>
              <span className="h-[3px] w-full bg-green-10"></span>
              <span className="h-[4px] w-full bg-green-10"></span>
            </div>
            SECURE
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-mercury-600">
            Trusted Execution Environment (TEE)
          </span>
          <div className="flex items-center gap-2 font-medium text-green-10">
            <div className="flex w-[13px] flex-col gap-[1px]">
              <span className="h-[1px] w-full bg-green-10"></span>
              <span className="h-[2px] w-full bg-green-10"></span>
              <span className="h-[3px] w-full bg-green-10"></span>
              <span className="h-[4px] w-full bg-green-10"></span>
            </div>
            SECURE
          </div>
        </div>

        <div className="my-2 h-[1px] w-full bg-mercury-100" />

        <div className="flex items-center justify-between">
          <span className="text-base-b text-mercury-950">My data:</span>
          <div className="flex items-center gap-2">
            {agent ? (
              <div
                onClick={() => {
                  navigate(PATH_NAMES.MY_DATA)
                }}
                className="flex cursor-pointer items-center gap-1 hover:opacity-70"
              >
                <DatabaseSearchIcon color="#A2845E" />
                <span className="text-base font-medium text-[#A2845E]">
                  Manage
                </span>
              </div>
            ) : (
              "-"
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-mercury-600">Storage:</span>
          <div className="flex w-[70%] items-center gap-2">
            <div className="relative h-[2px] w-full rounded-full bg-mercury-100">
              <div
                style={{ width: "10%" }}
                className="absolute left-0 top-0 h-full bg-mercury-950"
              ></div>
            </div>
            <span className="text-base-md">12GB/200GB</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentInfo
