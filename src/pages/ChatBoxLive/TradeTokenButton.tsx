import { WarningIcon } from "@components/Icons"
import { ArrowsSort } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import React from "react"
import { Link } from "react-router-dom"

const TradeTokenButton: React.FC<{
  tradeLink?: string
}> = ({ tradeLink }) => {
  return tradeLink ? (
    <Button
      as={Link}
      to={tradeLink}
      target="blank"
      className="h-11 w-fit rounded-full bg-orange-500 text-white max-md:min-w-[60px] md:w-full"
    >
      <div className="max-md:hidden">
        <ArrowsSort color="#FFFF" />
      </div>
      <span className="text-base text-white">Trade</span>
    </Button>
  ) : (
    <Button className="pointer-events-none h-11 w-fit rounded-full border-1 border-brown-500 bg-brown-50 text-white max-md:hidden md:w-full">
      <WarningIcon color="#83664B" />
      <span className="text-16 font-medium text-brown-600">
        Not tokenized yet
      </span>
    </Button>
  )
}

export default TradeTokenButton
