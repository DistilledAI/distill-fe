import { AppsOutlineIcon } from "@components/Icons/Clan"
import ClanTitle from "./ClanTitle"
import ClanPublicChip from "./ClanPublicChip"
import { CoinsOutlineIcon } from "@components/Icons/Sidebar"
import { SettingIcon } from "@components/Icons"
import { Switch } from "@nextui-org/react"
import { Controller, useFormContext } from "react-hook-form"

const Utilities = () => {
  const { control } = useFormContext()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <ClanTitle
          icon={<AppsOutlineIcon size={24} color="#A2845E" />}
          title="Utilities"
        />

        <ClanPublicChip />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-[130px] w-[220px] flex-col justify-between rounded-[22px] border border-white bg-mercury-30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CoinsOutlineIcon />
              <span className="text-16 font-medium text-mercury-950">
                Vault
              </span>
            </div>
            <div className="flex items-center gap-2">
              <SettingIcon />
              <span className="text-16 font-medium text-brown-600">Set</span>
            </div>
          </div>
          <Controller
            control={control}
            name="clan.utilityVault"
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onValueChange={(isSelected) =>
                  field.onChange(isSelected ? 1 : 0)
                }
              />
            )}
          />
        </div>

        <div className="flex h-[130px] w-[220px] flex-col justify-between rounded-[22px] border border-white bg-mercury-30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CoinsOutlineIcon />
              <span className="text-16 font-medium text-mercury-950">DAO</span>
            </div>
            <div className="flex items-center gap-2">
              <SettingIcon />
              <span className="text-16 font-medium text-brown-600">Set</span>
            </div>
          </div>
          <Controller
            control={control}
            name="clan.utilityDao"
            render={({ field }) => (
              <Switch
                isSelected={field.value}
                onValueChange={(isSelected) =>
                  field.onChange(isSelected ? 1 : 0)
                }
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Utilities
