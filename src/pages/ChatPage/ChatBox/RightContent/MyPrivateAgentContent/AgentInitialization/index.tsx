import Behaviors from "@pages/ChatPage/AgentDetail/Behaviors"
import GeneralInfo from "@pages/ChatPage/AgentDetail/GeneralInfo"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { createBot } from "services/chat"
import Header from "./Header"

interface AgentInitializationProps {
  botId: string
}

const AgentInitialization: React.FC<AgentInitializationProps> = () => {
  const methods = useForm<any>({
    defaultValues: {
      username: "",
      description: "",
      firstMsg: "",
    },
  })

  const onSubmit = async () => {
    try {
      const createBotResponse = await createBot({ name: "Unnamed" })
      if (createBotResponse) {
        toast.success("Created bot successfully")
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
      console.log("error", error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Header />
        <div className="mx-auto max-w-[800px] px-4 py-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px]">
          <GeneralInfo isBasicVersion />
          <Behaviors isBasicVersion />
        </div>
      </form>
    </FormProvider>
  )
}
export default AgentInitialization
