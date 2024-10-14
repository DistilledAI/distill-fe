import AvatarContainer from "@components/AvatarContainer"
import AvatarCustom from "@components/AvatarCustom"
import { ArrowLeftFilledIcon } from "@components/Icons/Arrow"
import { FilledBrainAIIcon } from "@components/Icons/BrainAIIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { FilledUserIcon } from "@components/Icons/UserIcon"
import { PATH_NAMES, RoleUser } from "@constants/index"
import { Checkbox, Input } from "@nextui-org/react"
import { debounce } from "lodash"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { createGroupChat, searchUsers } from "services/chat"
import { ContentDisplayMode, DISPLAY_MODES } from "./PrivateAI"

const CreateGroup: React.FC<ContentDisplayMode> = ({ onChangeDisplayMode }) => {
  const inputRef = useRef<any>(null)
  const [query, setQuery] = useState<string>("")
  const [searchResponse, setSearchResponse] = useState<any[]>([])
  const [userSelected, setUserSelected] = useState<any>([])
  const [_, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const activeStatus = 1

  const onBackToBoxMessage = () => {
    onChangeDisplayMode(DISPLAY_MODES.MESSAGES)
  }

  const onClearInputValue = () => {
    setQuery("")
    debounceSearch("")
  }

  const onSearch = async (keyword: string) => {
    try {
      setLoading(true)
      const payloadData = {
        username: keyword,
        status: activeStatus,
        role: RoleUser.USER,
      }
      const response = await searchUsers(JSON.stringify(payloadData))
      if (response) {
        return setSearchResponse(response?.data?.items)
      }
      setSearchResponse([])
    } catch (error) {
      console.log("error", error)
      setSearchResponse([])
    } finally {
      setLoading(false)
    }
  }

  const debounceSearch = debounce(onSearch, 500)

  useEffect(() => {
    inputRef?.current?.focus()
    onSearch("")
  }, [])

  const handleOnChangeValue = useCallback(
    (e: any) => {
      const value = e.currentTarget.value
      setQuery(value)
      debounceSearch(value)
    },
    [setQuery],
  )

  const getBadgeIcon = (role: RoleUser) =>
    role === RoleUser.BOT ? (
      <FilledBrainAIIcon size={14} />
    ) : (
      <FilledUserIcon size={14} />
    )

  const handleSelectUser = (user: any) => {
    const userSelectedIds = userSelected?.map((item: any) => item.id)
    const isIdExsist = userSelectedIds.includes(user.id)
    if (isIdExsist) {
      const newSelectedIds = userSelected.filter(
        (item: any) => item.id !== user.id,
      )
      return setUserSelected(newSelectedIds)
    }
    setUserSelected([...userSelected, user])
  }

  const handleCreateGroup = async () => {
    const userSelectedIds = userSelected?.map((item: any) => Number(item.id))
    try {
      const createGroupResponse = await createGroupChat({
        members: userSelectedIds,
      })

      if (createGroupResponse) {
        const newGroupId = createGroupResponse?.data?.id
        if (newGroupId) {
          navigate(`${PATH_NAMES.CHAT}/${newGroupId}`)
          onChangeDisplayMode(DISPLAY_MODES.MESSAGES)
        }
      }

      console.log(
        "🚀 ~ handleCreateGroup ~ createGroupResponse:",
        createGroupResponse,
      )
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
    }
  }

  return (
    <>
      <div className="flex w-full flex-col gap-1">
        <div className="max-h-[200px] overflow-y-auto">
          <div className="flex-items-center gap-2">
            <div
              className="cursor-pointer"
              onClick={() => onBackToBoxMessage()}
            >
              <ArrowLeftFilledIcon />
            </div>
            <span className="text-base-md">Add Members</span>
          </div>
          <div className="mb-1 mt-3 flex flex-wrap gap-2">
            {userSelected.map((user: any) => {
              return (
                <div key={user.id}>
                  <AvatarCustom
                    badgeIcon={getBadgeIcon(user?.role)}
                    src={user?.avatar}
                    badgeClassName={
                      user?.role === RoleUser.USER
                        ? "bg-[#0FE9A4]"
                        : "bg-yellow-10"
                    }
                  />
                </div>
              )
            })}
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

        <div className="mt-1 max-h-[calc(100%-160px)] overflow-y-auto">
          {searchResponse.map((user) => {
            const userSelectedIds = userSelected?.map((item: any) => item.id)
            const isSelected = userSelectedIds.includes(user.id)

            return (
              <div
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className="hover-light-effect flex-items-center relative mb-1 justify-between gap-2 rounded-full px-2 py-2"
              >
                <AvatarContainer
                  badgeIcon={getBadgeIcon(user?.role)}
                  avatarUrl={user?.avatar}
                  userName={user?.username}
                  badgeClassName={
                    user?.role === RoleUser.USER
                      ? "bg-[#0FE9A4]"
                      : "bg-yellow-10"
                  }
                />
                <Checkbox
                  radius="full"
                  value={user.id}
                  isSelected={isSelected}
                />
              </div>
            )
          })}
        </div>
      </div>

      <div
        className="flex-items-center absolute bottom-10 right-2 h-10 w-10 rotate-180 cursor-pointer justify-center rounded-full bg-mercury-200"
        onClick={() => handleCreateGroup()}
      >
        <ArrowLeftFilledIcon />
      </div>
    </>
  )
}

export default CreateGroup
