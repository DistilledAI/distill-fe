import { Publish, RoleUser, STATUS_AGENT } from "@constants/index"
import { debounce } from "lodash"
import { useEffect, useState } from "react"
import { searchUsers } from "services/chat"

const useSearch = (inputRef: any, isAutoFocus = true) => {
  const [query, setQuery] = useState<string>("")
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (isAutoFocus) {
      inputRef?.current?.focus()
      onSearch("", RoleUser.BOT)
    }
  }, [inputRef, isAutoFocus])

  const onSearch = async (keyword: string, role?: number) => {
    try {
      setLoading(true)
      const payloadData = {
        username: keyword,
        status: STATUS_AGENT.ACTIVE,
        role: keyword === "" ? RoleUser.BOT : role,
        publish: Publish.Published,
      }
      const response = await searchUsers({
        filter: payloadData,
      })
      if (response) {
        return setData(response?.data?.items)
      }
      setData([])
    } catch (error) {
      console.log("error", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const debounceSearch = debounce(onSearch, 500)

  return { debounceSearch, setQuery, query, data, loading, setLoading }
}

export default useSearch
