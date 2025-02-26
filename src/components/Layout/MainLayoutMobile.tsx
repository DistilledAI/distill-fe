import ConnectWalletModal from "@components/ConnectWalletModal"
import { StyleSpacingProvider } from "providers/StyleSpacingProvider"
import { Suspense } from "react"
import Header from "./Header"
import { Outlet } from "react-router-dom"
import NavigationMenu from "./Sidebar/NavigationMenu"

const MainLayoutMobile = () => {
  const renderContent = () => {
    return (
      <>
        <Header />
        <div className="pb-[60px] pt-[52px]">
          <Outlet />
        </div>
        <NavigationMenu isMobile={true} />
      </>
    )
  }

  return (
    <>
      <StyleSpacingProvider>{renderContent()}</StyleSpacingProvider>
      <Suspense fallback={null}>
        <ConnectWalletModal />
      </Suspense>
    </>
  )
}

export default MainLayoutMobile
