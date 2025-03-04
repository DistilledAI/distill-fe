import { avaMaxGray } from "@assets/images"
import AvatarCustom from "@components/AvatarCustom"
import CreateAgentModal from "@components/CreateAgentModal"
import { PlusIcon } from "@components/Icons/Plus"
import useAuthState from "@hooks/useAuthState"
import { Button, useDisclosure } from "@nextui-org/react"

const CreateAgent = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const { user } = useAuthState()

  return (
    <>
      <p className="text-base-b mb-2 text-mercury-950 max-md:text-15">
        Preview:
      </p>
      <div className="flex items-center justify-between gap-4 rounded-[14px] border-1 border-mercury-100 bg-mercury-50 p-4 max-md:flex-col max-md:items-start max-md:p-3">
        <div className="flex items-center gap-5">
          <div className="h-[72px] w-[72px] rounded-full border-1 border-mercury-400">
            <img
              className="h-full w-full rounded-full object-cover"
              src={avaMaxGray}
            />
          </div>
          <div>
            <p className="font-bold max-md:text-15">Agent name</p>
            <div className="flex items-center gap-2">
              <span className="font-medium text-mercury-600 max-md:text-14">
                Created by
              </span>
              <div className="flex items-center gap-1">
                <AvatarCustom
                  className="h-[18px] w-[18px] rounded-full max-md:h-[15px] max-md:w-[15px]"
                  src={user.avatar}
                  publicAddress={user.publicAddress}
                />
                <p className="font-bold text-[#A2845E] max-md:text-14">
                  @{user.username}
                </p>
              </div>
            </div>
            <p className="mt-2 text-14 font-medium text-mercury-600">
              A short bio will be displayed here.
            </p>
          </div>
        </div>
        <div className="max-md:flex max-md:w-full max-md:justify-center">
          <Button
            onPress={onOpen}
            className="flex h-[56px] items-center rounded-full bg-mercury-950 text-white max-md:h-[44px]"
          >
            <PlusIcon size={16} color="white" />
            <span className="font-bold">Create Agent</span>
          </Button>
        </div>
        <CreateAgentModal isOpen={isOpen} onClose={onClose} />
      </div>
    </>
  )
}

export default CreateAgent
