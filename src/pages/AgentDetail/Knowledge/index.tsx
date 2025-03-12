import {
  DatabaseSearchIcon,
  DatabaseSettingIcon,
} from "@components/Icons/DatabaseImportIcon"
import CategoryLabel from "../CategoryLabel"
import { useNavigate } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import FYIModal from "@pages/ChatPageOld/ChatContainer/RightContent/Modal/FYIModal"
import { useState } from "react"
import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { DislikeFillIcon, LikeFillIcon } from "@components/Icons"
import { Textarea } from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"

const KnowledgeAgent: React.FC = () => {
  const { control } = useFormContext()
  const [openFYIPopup, setOpenFYIPopup] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <CategoryLabel text="Knowledge" icon={<DatabaseSettingIcon />} />
      <div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Connected Source</p>
          <div
            onClick={() => {
              navigate(PATH_NAMES.MY_DATA)
            }}
            className="flex cursor-pointer items-center gap-1 hover:opacity-70"
          >
            <DatabaseSearchIcon color="#A2845E" />
            <span className="text-base font-medium text-[#A2845E]">Manage</span>
          </div>
        </div>
        <p className="mt-2 text-mercury-700">
          Your agent’s intelligence is built on the private data you add and the
          information you share in chats with your private agent. All of this
          information is securely protected, and the agent will not access or
          share it with anyone.
        </p>
        <div
          className="flex-items-center mt-2 cursor-pointer gap-2 max-md:mb-2"
          onClick={() => setOpenFYIPopup(true)}
        >
          <FilledShieldCheckedIcon color="#A2845E" />
          <span className="text-16 font-medium text-brown-500">
            How do we protect your private data?
          </span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 max-md:grid-cols-1">
          <div className="rounded-[22px] bg-green-50 p-4">
            <div className="flex items-center gap-1">
              <LikeFillIcon />
              <p className="font-semibold">Knowledge Domain</p>
            </div>
            <p className="my-2 min-h-10 leading-5 text-mercury-700">
              List any specific areas of knowledge the Agent should specialize
              in
            </p>
            <Controller
              name="knowledge_domain"
              control={control}
              render={({ field: { value, onChange } }: any) => {
                return (
                  <div className="w-full">
                    <Textarea
                      classNames={{
                        inputWrapper: "border-1 border-mercury-400",
                      }}
                      rows={3}
                      value={value || ""}
                      placeholder='eg., "finance, fitness, coding"'
                      onChange={(e) => {
                        onChange(e.target.value)
                      }}
                    />
                  </div>
                )
              }}
            />
          </div>
          <div className="rounded-[22px] bg-[#FDF0EF] p-4">
            <div className="flex items-center gap-1">
              <DislikeFillIcon />
              <p className="font-semibold">Prohibited Topics</p>
            </div>
            <p className="my-2 min-h-10 leading-5 text-mercury-700">
              Specify any topics the Agent should avoid
            </p>
            <Controller
              name="prohibited_topics"
              control={control}
              render={({ field: { value, onChange } }: any) => {
                return (
                  <div className="w-full">
                    <Textarea
                      classNames={{
                        inputWrapper: "border-1 border-mercury-400",
                      }}
                      rows={3}
                      placeholder='eg., "politics, religion, violence"'
                      onChange={(e) => {
                        onChange(e.target.value)
                      }}
                      value={value || ""}
                    />
                  </div>
                )
              }}
            />
          </div>
        </div>
      </div>
      <FYIModal openPopup={openFYIPopup} setOpenPopup={setOpenFYIPopup} />
    </div>
  )
}

export default KnowledgeAgent
