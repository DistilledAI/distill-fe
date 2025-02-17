import { desktopPrivateAgent } from "@assets/images"
import FeaturedAgent from "./FeaturedAgent"
import NewAgent from "./NewAgent"
import ForCreator from "./ForCreator"
import MultiChat from "./MultiChat"
import { useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"

const HomePage = () => {
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)

  return (
    <div
      className={twMerge(
        "relative pb-14 duration-300",
        !sidebarCollapsed && "pl-[196px]",
      )}
    >
      <div
        className={twMerge(
          "fixed left-0 right-0 top-0 h-dvh duration-300",
          !sidebarCollapsed && "left-[196px]",
        )}
        style={{
          backgroundImage: `url(${desktopPrivateAgent})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="relative mx-auto max-w-[884px] px-4">
        <FeaturedAgent />
        <NewAgent />
        <ForCreator />
      </div>
      <MultiChat />
    </div>
  )
}

export default HomePage
