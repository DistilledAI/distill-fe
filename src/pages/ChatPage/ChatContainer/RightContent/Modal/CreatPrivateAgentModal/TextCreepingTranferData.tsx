import useTextCreeping from "@hooks/useTextCreeping"

const LIST_TEXT_DEFAULT_2 = [
  "Your data is transferred to your own confidential pod.",
]

const TextCreepingTranferData: React.FC = () => {
  const { text: text2 } = useTextCreeping({ listText: LIST_TEXT_DEFAULT_2 })

  return (
    <div className="relative mb-4 max-w-[300px] text-base transition-all duration-500 ease-linear max-md:mb-2">
      <span className="text-[24px] font-semibold text-mercury-950 max-md:text-18">
        {text2}
      </span>
    </div>
  )
}
export default TextCreepingTranferData
