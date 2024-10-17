import DrawerBottom from "@components/DrawerBottom"
import { defineElement } from "@utils/index"
import React, { useEffect, useState } from "react"
import usePrivateAgent from "../../RightContent/MyPrivateAgentContent/usePrivateAgent"
import MyData from "./MyData"
import MyWallet from "./MyWallet"

export const TYPE_CONTENT = {
  MY_WALLET: "MY_WALLET",
  MY_DATA: "MY_DATA",
}

const AccountSetting: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const [typeContent, setTypeContent] = useState<string>(TYPE_CONTENT.MY_WALLET)
  const { privateAgentData, callGetMyPrivateAgent, loading } = usePrivateAgent()
  console.log("🚀 ~ privateAgentData:", privateAgentData)

  useEffect(() => {
    callGetMyPrivateAgent()
  }, [])

  const MAP_CONTENT_BY_TYPE = {
    [TYPE_CONTENT.MY_WALLET]: <MyWallet />,
    [TYPE_CONTENT.MY_DATA]: <MyData />,
  }

  useEffect(() => {
    setTypeContent(TYPE_CONTENT.MY_WALLET)
  }, [])

  return (
    <DrawerBottom isOpen={isOpen} onClose={onClose}>
      {isOpen && (
        <>
          {defineElement(MAP_CONTENT_BY_TYPE[typeContent], {
            setTypeContent,
            onClose,
          })}
        </>
      )}
    </DrawerBottom>
  )
}

export default AccountSetting
