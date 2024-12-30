interface Props {
  icon: React.ElementType
  title: string
  value: string
}

const StatCard = ({ icon: Icon, title, value }: Props) => {
  return (
    <div className="w-full rounded-[22px] bg-white px-[18px] py-6 md:bg-mercury-30">
      <div className="mb-3 flex items-center gap-1.5">
        <Icon color="#888888" />
        <span className="text-14 font-medium text-mercury-600">{title}</span>
      </div>
      <span className="text-24 font-semibold max-md:text-18">{value}</span>
    </div>
  )
}

export default StatCard
