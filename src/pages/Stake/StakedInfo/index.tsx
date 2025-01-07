const StakedInfo = () => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between rounded-[22px] border-1 border-mercury-100 bg-mercury-70 px-8 pb-6 pt-8">
        <div>
          <p className="text-14 font-medium text-mercury-700">
            Total MAX staked
          </p>
          <p className="text-20 font-medium text-mercury-950">443.8M MAX</p>
        </div>
        <div>
          <p className="text-right text-14 font-medium text-mercury-700">
            Unique stakers
          </p>
          <p className="text-right text-20 font-medium text-mercury-950">120</p>
        </div>
      </div>
    </div>
  )
}

export default StakedInfo
