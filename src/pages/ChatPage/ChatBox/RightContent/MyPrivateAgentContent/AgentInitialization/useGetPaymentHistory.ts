import useAuthState from "@hooks/useAuthState"
import { useState } from "react"
import { getPaymentHistory } from "services/agent"

const useGetPaymentHistory = () => {
  const { user } = useAuthState()
  const [isPaid, setIsPaid] = useState<boolean>(false)

  const checkPayment = async () => {
    try {
      const res = await getPaymentHistory({
        offset: 0,
        size: 10,
      })

      if (res) {
        const paymentHistoryList = res?.data?.items
        const userId = user?.id
        const exsitsPayment = paymentHistoryList?.find(
          (item: any) => item?.userId == userId,
        )
        if (exsitsPayment) return setIsPaid(true)
      }

      setIsPaid(false)
    } catch (error) {
      setIsPaid(false)
      console.log("error:", error)
    }
  }

  return { checkPayment, isPaid }
}

export default useGetPaymentHistory
