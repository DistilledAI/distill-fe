import {
  CoinGeckoPrices,
  CONFIG_TOKEN_PRICE_CGK,
  getCoingeckoPrices,
} from "@hooks/useCoingecko"
import { useEffect, useState } from "react"

const useFetchPrice = () => {
  const [prices, setPrices] = useState<CoinGeckoPrices<string>>()
  const tokens = [...new Set([...CONFIG_TOKEN_PRICE_CGK])]
  tokens.sort()
  const getPrice = async () => {
    const { prices } = await getCoingeckoPrices(tokens)
    setPrices(prices)
  }

  useEffect(() => {
    getPrice()
  }, [])

  return { prices }
}

export default useFetchPrice
