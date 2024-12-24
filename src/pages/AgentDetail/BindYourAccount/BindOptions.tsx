import { SettingIcon } from "@components/Icons"
import { Checkbox } from "@nextui-org/react"

const BIND_OPTIONS = [
  {
    key: "AUTO",
    label: "We Setup For You",
    icon: <SettingIcon />,
  },
  {
    key: "MANUAL",
    label: "Manually Setup",
    icon: <SettingIcon />,
  },
]

interface BindOptionsProps {
  setSelectedKey: any
  selectedKey: string
}

const BindOptions: React.FC<BindOptionsProps> = ({
  setSelectedKey,
  selectedKey,
}) => {
  const onChangeProfileType = (record: any) => {
    setSelectedKey(record.key)
  }

  return (
    <div className="flex h-[54px] items-center gap-4 rounded-xl bg-mercury-200 p-1">
      {BIND_OPTIONS.map((record) => {
        const isSelected = record.key === selectedKey
        return (
          <div
            key={record.key}
            onClick={() => onChangeProfileType(record)}
            aria-selected={isSelected}
            className="flex h-full w-full cursor-pointer items-center justify-between rounded-lg p-2 delay-100 duration-500 hover:bg-white aria-selected:bg-white aria-selected:max-md:bg-mercury-100"
          >
            <div className="flex items-center gap-2">
              {record.icon}
              <span className="text-base-md text-mercury-900">
                {record.label}
              </span>
            </div>
            <Checkbox radius="full" isSelected={isSelected} />
          </div>
        )
      })}
    </div>
  )
}
export default BindOptions
