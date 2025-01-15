import React, { useEffect, useMemo, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import ClanItem from "./ClanItem"
import { ArrowRightIcon, ArrowsLeftIcon } from "@components/Icons/Arrow"
import { twMerge } from "tailwind-merge"
import { Link, useParams } from "react-router-dom"
import { PATH_NAMES } from "@constants/index"
import useFetchClan from "@pages/Marketplace/useFetchClan"
import ClanSkeleton from "./Skeleton"
import useAuthState from "@hooks/useAuthState"
import { useQuery } from "@tanstack/react-query"
import { QueryDataKeys } from "types/queryDataKeys"
// import { FilledSearchIcon } from "@components/Icons/SearchIcon"
import { useAppSelector } from "@hooks/useAppRedux"

const ChatClans: React.FC = () => {
  const prevRef = useRef<any>(null)
  const nextRef = useRef<any>(null)
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const { user, isLogin } = useAuthState()
  const { chatId } = useParams()
  const [isFirstSlide, setIsFirstSlide] = useState(true)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const { data: isRefresh } = useQuery({
    queryKey: [QueryDataKeys.IS_REFRESH_CLANS],
  })
  const { data, loading, getList } = useFetchClan(
    false,
    isLogin ? user.id : undefined,
  )

  const dataSorted = useMemo(() => {
    const dt = data.sort((a, b) => {
      if (a.groupUser?.length && !b.groupUser?.length) return -1
      if (!a.groupUser?.length && b.groupUser?.length) return 1
      return 0
    })
    const indexActive = dt.findIndex((item) => item.label === chatId)
    if (indexActive > -1) {
      const [item] = dt.splice(indexActive, 1)
      dt.unshift(item)
    }

    return dt
  }, [data])

  useEffect(() => {
    getList(false)
  }, [user.id, isRefresh])

  const handleSlideChange = (s: any) => {
    setIsFirstSlide(s.isBeginning)
    setIsLastSlide(s.isEnd)
  }

  return (
    <div className="mt-5 max-md:mt-0">
      <div
        className={twMerge(
          "mb-2 flex items-center justify-between px-2 max-md:hidden",
          sidebarCollapsed && "justify-center",
        )}
      >
        <p
          className={twMerge(
            "text-14 text-[#11181c]",
            sidebarCollapsed && "hidden",
          )}
        >
          Clan
        </p>
        {/* <div className="flex items-center gap-4">
          <div className="cursor-pointer">
            <FilledSearchIcon />
          </div>
        </div> */}
      </div>
      {loading ? (
        <ClanSkeleton />
      ) : (
        <div className="relative">
          <Swiper
            onSlideChange={handleSlideChange}
            spaceBetween={10}
            slidesPerView={sidebarCollapsed ? 1 : 4}
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {dataSorted.map((group) => {
              return (
                <SwiperSlide key={group.id} className="py-1">
                  <ClanItem
                    group={group}
                    isJoined={
                      group.groupUser ? group.groupUser.length > 0 : false
                    }
                  />
                </SwiperSlide>
              )
            })}
            {!sidebarCollapsed && (
              <SwiperSlide key="last-all" className="py-1">
                <Link
                  to={PATH_NAMES.MARKETPLACE}
                  className="flex w-[60px] cursor-pointer items-center justify-center rounded-[14px] bg-mercury-200 px-1 py-4 duration-400 hover:opacity-80"
                >
                  <span className="text-center text-13 font-semibold text-mercury-950">
                    Show all clans
                  </span>
                </Link>
              </SwiperSlide>
            )}
          </Swiper>
          <div
            ref={prevRef}
            className={twMerge(
              "absolute left-[-5px] top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(84,84,84,0.1)] backdrop-blur-[10px] duration-300",
              (sidebarCollapsed || isFirstSlide) && "hidden",
            )}
          >
            <ArrowsLeftIcon size={20} color="#676767" />
          </div>
          <div
            ref={nextRef}
            className={twMerge(
              "absolute right-[-5px] top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(84,84,84,0.1)] backdrop-blur-[10px] duration-300",
              (isLastSlide || dataSorted.length < 4) && "hidden",
              sidebarCollapsed && "hidden",
            )}
          >
            <ArrowRightIcon size={20} color="#676767" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatClans
