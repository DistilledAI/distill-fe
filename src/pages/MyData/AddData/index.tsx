import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { DatabaseImportIcon } from "@components/Icons/DatabaseImportIcon"
import { ThreeDotsIcon } from "@components/Icons/SocialLinkIcon"
import { PATH_NAMES } from "@constants/index"
import { Button } from "@nextui-org/react"
import React from "react"
import { useNavigate } from "react-router-dom"

const AddData: React.FC<{
  botId: number | undefined
}> = ({ botId }) => {
  const navigate = useNavigate()

  return (
    <Button
      className="h-[44px] bg-mercury-950 max-md:h-[38px]"
      radius="full"
      onPress={() =>
        navigate(
          botId ? `${PATH_NAMES.ADD_MY_DATA}/${botId}` : PATH_NAMES.ADD_MY_DATA,
        )
      }
    >
      <div className="flex-items-center gap-1 max-md:hidden">
        <FilledBrainAIIcon size={20} color="#FFFF" />
        <ThreeDotsIcon size={20} color="#FFFF" />
        <DatabaseImportIcon size={20} color="#FFFF" />
      </div>
      <span className="ml-1 text-mercury-30 max-md:ml-0">Add data</span>
    </Button>
  )
}

export default AddData
