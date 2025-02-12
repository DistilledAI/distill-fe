import axios from "axios"
import { useEffect, useState } from "react"

const BASE_API_RACKS_VAULT = import.meta.env.VITE_RACKS_VAULT_BACKEND_URL
console.log(BASE_API_RACKS_VAULT);
const LIMIT = 5

export interface IDataHistory {
  _id: string
  aum: number
  date: string
  shareValues: number
  totalShares: number
}

const useFetchHistory = (limit = LIMIT) => {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<IDataHistory[]>([])
  const [loading, setLoading] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)
  const isFistPage = page === 1

  const getData = async (page = 1) => {
    const offset = (page - 1) * limit
    setPage(page)

    try {
      setLoading(true)
      const res = await axios.request({
        url: `${BASE_API_RACKS_VAULT}/firstAgentFund`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: { limit, offset },
      })

      const isLast = res.data && res.data.length === 0
      if (isLast) {
        setIsLastPage(true)
        setPage((page) => page - 1)
        return
      } else setIsLastPage(false)

      if (res.data) {
        setData(res.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return { data, loading, getData, page, isLastPage, isFistPage }
}

export default useFetchHistory
