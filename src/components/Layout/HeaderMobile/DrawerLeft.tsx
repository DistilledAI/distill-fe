import { Button, Modal, ModalBody, ModalContent } from "@nextui-org/react"
import React from "react"
// import { FilledWindowIcon } from "@components/Icons/FilledWindowIcon"
import CloseButton from "@components/CloseButton"
import ComingSoon from "@components/ComingSoon"
import { DatabaseSearchIcon } from "@components/Icons/DatabaseImportIcon"
import { SearchUserIconOutline } from "@components/Icons/UserIcon"
import { PATH_NAMES } from "@constants/index"
import AnalyticsInfoWrap from "@pages/ChatPage/ChatBox/LeftBar/AnalyticsInfoWrap"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "@hooks/useAppRedux"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const DrawerLeft: React.FC<Props> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const myAgent = useAppSelector((state) => state.agents.myAgent)
  const hasBot = !!myAgent
  const isHiddenMyData = !hasBot

  const MENU = [
    // {
    //   name: "Playground",
    //   icon: <FilledWindowIcon />,
    //   isComingSoon: true,
    //   url: "",
    //   hidden: false,
    // },
    {
      name: "My data",
      icon: <DatabaseSearchIcon />,
      isComingSoon: false,
      url: PATH_NAMES.MY_DATA,
      hidden: isHiddenMyData,
    },
    {
      name: "My agents",
      icon: <SearchUserIconOutline />,
      isComingSoon: false,
      url: PATH_NAMES.MY_AGENTS,
    },
  ]

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      backdrop="transparent"
      size="full"
      classNames={{
        wrapper: "flex justify-start",
      }}
      hideCloseButton
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          },
          exit: {
            x: -100,
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeInOut",
            },
          },
        },
      }}
    >
      <ModalContent className="w-[80%] !rounded-br-[32px] !rounded-tr-[32px] border-r border-r-mercury-100 bg-mercury-70">
        <ModalBody className="gap-4 px-3 pb-4 pt-10">
          <CloseButton onClose={onClose} />
          {MENU.map(
            (item, index) =>
              !item.hidden && (
                <ComingSoon isOffComing={!item.isComingSoon} key={index}>
                  <Button
                    key={index}
                    className="btn-primary min-h-[60px] w-full justify-start"
                    onClick={() => {
                      navigate(item.url)
                      onClose()
                    }}
                  >
                    <div>{item.icon}</div>
                    {item.name}
                  </Button>
                </ComingSoon>
              ),
          )}
          <div className="flex h-full flex-col justify-end">
            <AnalyticsInfoWrap />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DrawerLeft
