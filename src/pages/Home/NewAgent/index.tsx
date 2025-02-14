import { LeafIcon } from "@components/Icons"
import useFetchClan from "@pages/Marketplace/useFetchClan"
import { Link } from "react-router-dom"
import ClanItem from "./ClanItem"
import ClanSkeleton from "./ClanSkeleton"

const NewAgent = () => {
  const { data, loading } = useFetchClan({})

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <LeafIcon />
          <h3 className="text-22 font-bold text-mercury-950">New Agents</h3>
        </div>
        <Link
          className="inline-flex h-[40px] items-center rounded-full bg-brown-50 px-5 font-bold text-brown-600"
          to={"#"}
        >
          View All
        </Link>
      </div>
      {loading ? (
        <ClanSkeleton />
      ) : (
        <div className="mt-4 grid grid-cols-10 gap-1">
          {data.map((item) => (
            <ClanItem key={item.id} isJoined group={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default NewAgent
