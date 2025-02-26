import CloseButton from "@components/CloseButton"
import useOutsideClick from "@hooks/useOutSideClick"
import { useRef } from "react"
import { twMerge } from "tailwind-merge"

interface DrawerBottomProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  isOutsideClose?: boolean
  className?: string
  classNames?: {
    base?: string
    closeButton?: string
    body?: string
  }
}

const DrawerBottom = ({
  isOpen,
  onClose,
  children,
  isOutsideClose = false,
  className,
  classNames,
}: DrawerBottomProps) => {
  const outsideRef = useRef<any>()
  useOutsideClick(outsideRef, onClose)

  return (
    <div
      ref={isOutsideClose ? outsideRef : null}
      className={twMerge(
        "fixed bottom-0 left-1/2 z-50 mx-auto h-[calc(100dvh-8px)] w-full max-w-[1100px] -translate-x-1/2 translate-y-[100%] rounded-b-[14px] rounded-t-[14px] bg-[rgba(211,211,211,0.70)] shadow-4 backdrop-blur-[15px] duration-400 ease-in-out md:h-[calc(100dvh-200px)] md:rounded-b-[32px] md:rounded-t-[40px]",
        isOpen && "translate-y-0",
        className,
        classNames?.base,
      )}
    >
      {isOpen ? (
        <>
          <CloseButton
            onClose={onClose}
            className={twMerge(
              "absolute right-3 top-[10px] z-[1] md:right-5 md:top-10",
              classNames?.closeButton,
            )}
          />
          <div
            className={twMerge(
              "h-full w-full translate-y-[100px] px-3 py-4 delay-100 duration-500 md:px-20 md:py-10",
              isOpen && "translate-y-0",
              classNames?.body,
            )}
          >
            {children}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default DrawerBottom
