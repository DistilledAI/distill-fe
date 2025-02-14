import { desktopPrivateAgent } from "@assets/images"
import FeaturedAgent from "./FeaturedAgent"
import NewAgent from "./NewAgent"
import ForCreator from "./ForCreator"
import MultiChat from "./MultiChat"

const HomePage = () => {
  return (
    <div className="relative pb-14">
      <div
        className="absolute left-0 top-0 h-[calc(100dvh-68px)] w-full"
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
