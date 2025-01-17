import { BarIcon } from "@components/Icons/Bar"
import { DistilledIconNoText } from "@components/Icons/DistilledAIIcon"
import { PATH_NAMES } from "@constants/index"
import useConnectWallet from "@hooks/useConnectWallet"
import { useDisclosure } from "@nextui-org/react"
import UserAuth from "@pages/ChatPage/ChatBox/UserAuth"
import React from "react"
import { Link, useLocation } from "react-router-dom"
import DrawerLeft from "./DrawerLeft"
import { twMerge } from "tailwind-merge"

const MAP_PAGE_TITLE_FROM_PATH_NAME = {
  [PATH_NAMES.PRIVATE_AGENT]: "Private Agent",
  [PATH_NAMES.MARKETPLACE]: "Marketplace",
}

const HeaderMobile: React.FC = () => {
  const { connectMultipleWallet, loading } = useConnectWallet()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { pathname } = useLocation()
  const pageTitle = MAP_PAGE_TITLE_FROM_PATH_NAME[pathname]

  return (
    <>
      <div className="fixed left-0 top-0 z-10 flex h-[50px] w-full items-center justify-between bg-white px-4">
        <div onClick={onOpen}>
          <BarIcon />
        </div>
        <div
          className={twMerge("absolute left-[50px] top-1/2 -translate-y-1/2")}
        >
          {pageTitle ? (
            <span className="text-base-sb">{pageTitle}</span>
          ) : (
            <Link to={PATH_NAMES.HOME}>
              <DistilledIconNoText />
            </Link>
          )}
        </div>
        <UserAuth connectWallet={connectMultipleWallet} loading={loading} />
      </div>
      <DrawerLeft isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default HeaderMobile
