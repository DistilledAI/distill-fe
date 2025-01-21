const AumInfo = () => {
  return (
    <div className="mb-6">
      <div className="rounded-[22px] border-1 border-mercury-100 bg-mercury-70 px-7 py-5">
        <p className="text-14 font-bold text-mercury-900">
          AUM{" "}
          <span className="font-medium text-mercury-700">
            (Assets Under Management)
          </span>
        </p>
        <p className="text-24 font-bold text-mercury-950">$1,223,556</p>
        <p className="inline-block rounded-md bg-[#F1FCF3] p-1 text-14 text-green-600">
          +3.44% Today
        </p>
      </div>
    </div>
  )
}

export default AumInfo
