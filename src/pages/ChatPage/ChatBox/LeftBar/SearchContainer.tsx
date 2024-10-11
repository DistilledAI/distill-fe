import AvatarContainer from "@components/AvatarContainer"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { RoleUser } from "@constants/index"
import { Input } from "@nextui-org/react"
import { debounce } from "lodash"
import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkGroupDirect, createGroupChat, searchUsers } from "services/chat"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"

const SearchContainer: React.FC<ContentDisplayMode> = ({
  onChangeDisplayMode,
}) => {
  const navigate = useNavigate()
  const inputRef = useRef<any>(null)
  const [query, setQuery] = useState<string>("")
  const [data, setData] = useState<any[]>([])
  const [_, setLoading] = useState<boolean>(true)
  const activeStatus = 1

  useEffect(() => {
    inputRef?.current?.focus()
    onSearch("", RoleUser.BOT)
  }, [])

  const onBackToBoxMessage = () => {
    onChangeDisplayMode(DISPLAY_MODES.MESSAGES)
  }

  const onSearch = async (keyword: string, role?: number) => {
    try {
      setLoading(true)
      const payloadData = {
        username: keyword,
        status: activeStatus,
        role: keyword === "" ? RoleUser.BOT : role,
      }
      const response = await searchUsers(JSON.stringify(payloadData))
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

  const handleSelectPerson = async (chat: any) => {
    try {
      const receiverId = chat?.id
      const checkGroupDirectResponse = await checkGroupDirect({
        members: [receiverId],
      })
      const groupId = checkGroupDirectResponse?.data?.group?.id
      if (!groupId) {
        const createGroupResponse = await createGroupChat({
          members: [receiverId],
        })
        const newGroupId = createGroupResponse?.data?.id
        if (newGroupId) {
          navigate(`/chat/${newGroupId}`)
          onBackToBoxMessage()
        }
        return
      }

      navigate(`/chat/${groupId}`)
      onBackToBoxMessage()
    } catch (error) {
      console.log("error", error)
    }
  }

  const onClearInputValue = () => {
    setQuery("")
    debounceSearch("")
  }

  const getBadgeIcon = (role: RoleUser) =>
    role === RoleUser.BOT ? (
      <FilledBrainAIIcon size={14} />
    ) : (
      <FilledUserIcon size={14} />
    )

  return (
    <>
      <div className="flex-items-center mb-4 justify-between gap-2 px-2">
        <div className="cursor-pointer" onClick={() => onBackToBoxMessage()}>
          <ArrowLeftFilledIcon />
        </div>
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
      </div>

      <div className="max-h-[calc(100%-160px)] overflow-y-auto">
        {data.map((chat) => {
          return (
            <div
              key={chat.id}
              onClick={() => handleSelectPerson(chat)}
              className="hover-light-effect relative mb-1 gap-2 rounded-full px-2 py-2"
            >
              <AvatarContainer
                badgeIcon={getBadgeIcon(chat?.role)}
                avatarUrl={chat?.avatar}
                userName={chat?.username}
                badgeClassName={
                  chat?.role === RoleUser.USER ? "bg-[#0FE9A4]" : "bg-yellow-10"
                }
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
export default SearchContainer
