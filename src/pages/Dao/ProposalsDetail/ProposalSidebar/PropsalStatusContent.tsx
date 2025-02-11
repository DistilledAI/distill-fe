import { ChartBarIcon } from "@components/Icons/Chart"
import { IProposal } from "@pages/Dao/Proposals/useProposals"

interface Props {
  proposalDetail: IProposal | null
}

const PropsalStatusContent = ({ proposalDetail }: Props) => (
  <>
    <div className="mt-2 flex items-center gap-2">
      <ChartBarIcon />
      <span className="text-16 text-mercury-950">Status</span>
    </div>
    <p className="mt-2 text-16 text-mercury-950">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
      voluptates amet totam neque, explicabo molestiae reiciendis ipsum optio
      minima? Eligendi esse amet numquam similique, dolorem natus non molestiae
      odio voluptate.
    </p>
    <div className="my-6 h-[1px] w-full bg-mercury-100" />
  </>
)

export default PropsalStatusContent
