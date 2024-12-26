import { spotlightBg } from "@assets/images"
import { Link } from "react-router-dom"
import { AgentSpotlight } from "../hooks/useTrendingAgent"
import SocialLinks from "./SocialLinks"
import { twMerge } from "tailwind-merge"

interface SpotlightAgentProps {
  agentSpotlight: AgentSpotlight
}

const SpotlightAgentCard = ({ agentSpotlight }: SpotlightAgentProps) => {
  return (
    <div
      style={{ backgroundImage: `url(${spotlightBg})` }}
      className="relative h-[183px] w-[39%] rounded-[22px] bg-cover bg-center bg-no-repeat p-[18px] max-md:min-w-full"
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <h3 className="text-[32px] font-[800] uppercase text-white">
            {agentSpotlight.images[0]?.title.toUpperCase()}
          </h3>
          <div className="w-fit rounded-[4px] border border-[rgba(255,255,255,0.40)] px-2">
            <span className="text-[13px] font-medium uppercase text-white">
              {agentSpotlight.images[0]?.des.toLocaleUpperCase()}
            </span>
          </div>
        </div>

        <div>
          <span className="text-[13px] font-medium uppercase text-white">
            $- MKT Cap
          </span>
          <SocialLinks socials={agentSpotlight.socials} />
        </div>
      </div>

      <img
        src={agentSpotlight.images[0]?.image}
        className="absolute -top-5 right-10 h-[239px] w-[185px] object-contain md:right-8"
        alt="agentSpotlight image"
        loading="lazy"
      />

      <Link
        to={agentSpotlight.socials.web || ""}
        className={twMerge(
          "absolute -right-4 -top-4 rounded-full bg-[#363636B2] px-4 py-2 text-16 font-bold text-white backdrop-blur-[10px] md:-right-8",
          !agentSpotlight.socials.web && "hidden",
        )}
      >
        Join Me!
      </Link>
    </div>
  )
}

export default SpotlightAgentCard
