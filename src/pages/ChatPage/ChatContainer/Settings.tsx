import { settingsIcon } from "@assets/svg"
import { Button, Image } from "@nextui-org/react"

const Settings = () => {
  return (
    <Button className="h-11 min-w-14 rounded-full border border-white bg-mercury-30 px-4 py-2">
      <Image src={settingsIcon} alt="settings icon" />
    </Button>
  )
}

export default Settings
