import { WarningIcon } from "@components/Icons"
import { ArrowsSort } from "@components/Icons/Arrow"
import { Button } from "@nextui-org/react"
import React from "react"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

const TradeTokenButton: React.FC<{
  tradeLink?: string
  classNames?: {
    btnLink?: string
    btnNot?: string
  }
}> = ({ tradeLink, classNames }) => {
  return tradeLink ? (
    <Button
      as={Link}
      to={tradeLink}
      target="blank"
      className={twMerge(
        "h-11 w-fit rounded-full border border-mercury-900 bg-mercury-950 text-white max-md:min-w-[60px] md:w-full",
        classNames?.btnLink,
      )}
    >
      <div className="max-md:hidden">
        <ArrowsSort color="#FFFF" />
      </div>
      <span className="text-base text-white">Trade</span>
    </Button>
  ) : (
    <Button
      className={twMerge(
        "pointer-events-none h-11 w-fit rounded-full border-1 border-brown-500 bg-brown-50 text-white max-md:hidden md:w-full",
        classNames?.btnNot,
      )}
    >
      <WarningIcon color="#83664B" />
      <span className="text-16 font-medium text-brown-600">
        Not tokenized yet
      </span>
    </Button>
  )
}

export default TradeTokenButton
