import Markdown from "react-markdown"
import VotingStats from "./VotingStats"

const ProposalContent = () => (
  <div className="space-y-6">
    <h2 className="text-28 font-semibold">
      Improvements on oraix staking interface to show revenue stats
    </h2>

    <div>
      <span className="text-14 text-mercury-700">XAM – February 5</span>
      <Markdown className="text-16 text-mercury-950">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur
        recusandae, beatae repellat nihil, assumenda hic dolorem perspiciatis
        laudantium facere qui eum cupiditate maxime quia nesciunt obcaecati
        voluptatibus in atque aspernatur?
      </Markdown>
    </div>

    <VotingStats />
  </div>
)

export default ProposalContent
