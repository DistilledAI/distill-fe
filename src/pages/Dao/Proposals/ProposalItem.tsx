const ProposalItem = () => {
  return (
    <div className="flex cursor-pointer items-center gap-4 rounded-full bg-mercury-70 px-4 py-3 hover:bg-mercury-100">
      <span className="text-14 text-mercury-700">A-0001</span>
      <div>
        <span className="text-[15px] text-mercury-950">Open</span>
      </div>
      <p className="line-clamp-1 flex-1 text-16 text-mercury-950">
        Improvements on oraix staking interface to show revenue stats
      </p>
      <span className="text-14 text-mercury-700">1 days</span>
    </div>
  )
}

export default ProposalItem
