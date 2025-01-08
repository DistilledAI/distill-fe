// import { Button } from "@nextui-org/react"

const WithdrawAll = () => {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between">
      <div className="text-14 text-medium text-mercury-800">
        To withdraw your stake, you will need to activate a{" "}
        <span className="font-semibold text-brown-500">
          30-day unstaking period no fee.
        </span>{" "}
        You may withdraw at any time, but your tokens will become available
        again only after this duration.
      </div>
      {/* <Button className="h-8 rounded-full bg-mercury-950 text-14 font-medium text-white max-md:mt-3">
        WITHDRAW ALL
      </Button> */}
    </div>
  )
}

export default WithdrawAll
