import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { Checkbox, CheckboxGroup, Input, Link, User } from "@nextui-org/react"
import { debounce } from "lodash"
import React, { useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserById } from "services/chat"
import { DISPLAY_MODES } from "./PrivateAI"

const CreateGroup: React.FC<{ onChangeDisplayMode: any }> = ({
  onChangeDisplayMode,
}) => {
  const [groupSelected, setGroupSelected] = React.useState([])
  const navigate = useNavigate()
  const inputRef = useRef<any>(null)
  const [query, setQuery] = useState<string>("")
  const [data, setData] = useState<any[]>([])
  const [_, setLoading] = useState<boolean>(true)

  const onBackToBoxMessage = () => {
    onChangeDisplayMode(DISPLAY_MODES.MESSAGES)
  }

  const onClearInputValue = () => {
    setQuery("")
    debounceSearch("")
  }

  const onSearch = async (value: string) => {
    try {
      setLoading(true)
      const response = await getUserById(value)
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

  const handleOnChangeValue = useCallback(
    (e: any) => {
      const value = e.currentTarget.value
      setQuery(value)
      debounceSearch(value)
    },
    [setQuery],
  )

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex-items-center gap-2">
        <div className="cursor-pointer" onClick={() => onBackToBoxMessage()}>
          <ArrowLeftFilledIcon />
        </div>
        <span className="text-base-md">Add Members</span>
      </div>
      <p className="ml-1 mt-4 text-default-500">
        Selected: {groupSelected.join(", ")}
      </p>

      <Input
        placeholder="Search"
        labelPlacement="outside"
        startContent={<FilledSearchIcon />}
        endContent={
          query && (
            <div
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-mercury-300 p-[2px]"
              onClick={() => onClearInputValue()}
            >
              <CloseFilledIcon size={18} color="#676767" />
            </div>
          )
        }
        classNames={{
          inputWrapper:
            "!bg-mercury-200 rounded-full focus-visible:ring-opacity-0",
          innerWrapper:
            "!bg-mercury-200 rounded-full focus-visible:ring-opacity-0",
          input:
            "text-18 !text-mercury-950 caret-[#363636] focus-visible:ring-opacity-0 font-medium",
        }}
        onChange={handleOnChangeValue}
        value={query}
        ref={inputRef}
      />

      <div className="max-h-[calc(100%-160px)] overflow-y-auto">
        {data.map((chat) => {
          return (
            <div
              key={chat.id}
              onClick={() => {}}
              className="hover-light-effect relative mb-1 gap-2 rounded-full px-2 py-2"
            >
              {chat?.username}
            </div>
          )
        })}
      </div>

      <CheckboxGroup
        value={groupSelected}
        onChange={setGroupSelected}
        classNames={{
          base: "w-full",
        }}
      >
        <CustomCheckbox
          value="junior"
          user={{
            name: "Junior Garcia",
            avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
            username: "jrgarciadev",
            url: "https://twitter.com/jrgarciadev",
            role: "Software Developer",
            status: "Active",
          }}
          statusColor="secondary"
        />
        <CustomCheckbox
          value="johndoe"
          user={{
            name: "John Doe",
            avatar: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
            username: "johndoe",
            url: "#",
            role: "Product Designer",
            status: "Vacation",
          }}
          statusColor="warning"
        />
        <CustomCheckbox
          value="zoeylang"
          user={{
            name: "Zoey Lang",
            avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
            username: "zoeylang",
            url: "#",
            role: "Technical Writer",
            status: "Out of office",
          }}
          statusColor="danger"
        />
        <CustomCheckbox
          value="william"
          user={{
            name: "William Howard",
            avatar: "https://i.pravatar.cc/300?u=a048581f4e29026701d",
            username: "william",
            url: "#",
            role: "Sales Manager",
            status: "Active",
          }}
          statusColor="secondary"
        />
      </CheckboxGroup>
    </div>
  )
}

export default CreateGroup

const CustomCheckbox = ({ user, statusColor, value }) => {
  return (
    <div className="data-[selected=true]:border-primar m-0 inline-flex w-full max-w-md cursor-pointer items-center justify-start gap-2 rounded-full border-2 border-transparent p-1 hover:bg-mercury-100">
      <div className="flex w-full justify-between gap-2">
        <User
          avatarProps={{ size: "md", src: user.avatar }}
          description={
            <Link isExternal href={user.url} size="sm">
              @{user.username}
            </Link>
          }
          name={user.name}
        />
      </div>
      <Checkbox aria-label={user.name} value={value} radius="full"></Checkbox>
    </div>
  )
}
