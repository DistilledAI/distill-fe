import { LeafIcon } from "@components/Icons"
import useFetchClan from "@pages/Marketplace/useFetchClan"
import { Link } from "react-router-dom"
import ClanItem from "./ClanItem"
import ClanSkeleton from "./ClanSkeleton"
import useWindowSize from "@hooks/useWindowSize"

const NewAgent = () => {
  const { isMobile } = useWindowSize()
  const { data, loading } = useFetchClan({})

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <LeafIcon size={isMobile ? 22 : 28} />
          <h3 className="text-22 font-bold text-mercury-950 max-md:text-16">
            New Agents
          </h3>
        </div>
        <Link
          className="inline-flex h-[40px] items-center rounded-full bg-brown-50 px-5 font-bold text-brown-600 max-md:h-[36px] max-md:text-[14px]"
          to={"#"}
        >
          View All
        </Link>
      </div>
      {loading ? (
        <ClanSkeleton />
      ) : (
        <div className="overflow-x-auto scrollbar-hide">
          <div className="mt-4 grid grid-cols-10 gap-1 max-md:flex max-md:gap-2">
            {data.map((item) => (
              <ClanItem key={item.id} isJoined group={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NewAgent
