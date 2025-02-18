import { DistilledAIIcon } from "@components/Icons/DistilledAIIcon"
import { PlusIcon } from "@components/Icons/Plus"
import { useLocation, useNavigate } from "react-router-dom"
import Menu from "./Menu"
import Socials from "./Socials"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { useAppDispatch, useAppSelector } from "@hooks/useAppRedux"
import { twMerge } from "tailwind-merge"
import { updateSidebarCollapsed } from "@reducers/sidebarCollapsedSlice"
import { useLayoutEffect } from "react"
import { PATH_NAMES } from "@constants/index"

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const sidebarCollapsed = useAppSelector((state) => state.sidebarCollapsed)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (pathname) {
      dispatch(updateSidebarCollapsed(pathname !== "/"))
    }
  }, [pathname])

  return (
    <div
      className={twMerge(
        "fixed left-0 z-50 h-dvh w-[280px] transition-all duration-200 ease-in-out",
        sidebarCollapsed && "w-[84px]",
      )}
      onMouseEnter={() => dispatch(updateSidebarCollapsed(false))}
      onMouseLeave={() => {
        if (pathname !== "/") dispatch(updateSidebarCollapsed(true))
      }}
    >
      <div className="full flex h-full flex-col justify-between border border-mercury-100 bg-mercury-70 px-4 py-8 transition-all duration-200 ease-in-out">
        <div className="flex-1">
          <div
            className={twMerge(
              "mb-4 flex h-[26px] items-center justify-between",
              sidebarCollapsed && "flex-col gap-4",
            )}
          >
            <DistilledAIIcon
              baseClassName="w-fit h-fit rounded-none border-none cursor-pointer"
              iconClassName="w-[38px] h-5"
              onClick={() => navigate("/")}
            />
            <button
              type="button"
              className={twMerge(
                "group flex items-center gap-2",
                sidebarCollapsed && "hidden",
              )}
              onClick={() => navigate(PATH_NAMES.CREATE_AGENT)}
            >
              <div
                className={twMerge(
                  "flex items-center justify-center rounded-full border border-mercury-400 bg-mercury-100 p-1",
                  sidebarCollapsed && "h-12 w-full border-white bg-mercury-30",
                )}
              >
                <PlusIcon color="#545454" size={sidebarCollapsed ? 20 : 16} />
              </div>
              <span
                className={twMerge(
                  "whitespace-nowrap text-[16px] font-bold text-mercury-950 group-hover:text-mercury-800",
                  sidebarCollapsed && "hidden",
                )}
              >
                Create Agent
              </span>
            </button>
          </div>
          <Menu />
        </div>
        <Socials />
      </div>
      <button
        type="button"
        className="absolute -right-[10px] top-1/2 z-10 h-10 w-5 -translate-y-1/2 rounded-full bg-[#5454541A] shadow-10 backdrop-blur-[10px] transition-all duration-200 ease-in-out"
        onClick={() => dispatch(updateSidebarCollapsed(!sidebarCollapsed))}
      >
        <div
          className={twMerge(
            "rotate-90 transition-all duration-200 ease-in-out",
            sidebarCollapsed && "-rotate-90",
          )}
        >
          <ChevronDownIcon size={16} color="#676767" />
        </div>
      </button>
    </div>
  )
}

export default Sidebar
