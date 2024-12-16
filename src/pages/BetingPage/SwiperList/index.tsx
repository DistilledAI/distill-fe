/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"

import BetDisclaimer from "@components/BetDisclaimer"
import { ArrowsLeftIcon, ArrowsRightIcon } from "@components/Icons/Arrow"
import { RootState } from "@configs/store"
import useSwiper from "@hooks/useSwiper"
import { useWallet } from "@solana/wallet-adapter-react"
import { toBN } from "@utils/format"
import BigNumber from "bignumber.js"
import delay from "lodash/delay"
import { Web3SolanaProgramInteraction } from "program/utils/web3Utils"
import { useSelector } from "react-redux"
import { getPredictHistory } from "services/game"
import {
  FreeMode,
  Keyboard,
  Mousewheel,
  // Pagination,
  Virtual,
} from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import CardContainer, { STATUS_ROUND } from "../CardContainer"
import { DECIMAL_BTC } from "../constants"
import useDisclaimer from "../hooks/useDisclaimer"
import ModalBet from "../ModalBet"

export const CHART_DOT_CLICK_EVENT = "CHART_DOT_CLICK_EVENT"

const web3Solana = new Web3SolanaProgramInteraction()

const MAX_LIMIT = 10

const SwiperList = () => {
  const { setSwiper, swiper } = useSwiper()
  const { isAccepted, onOpen, isOpen, onOpenChange, onAccept } = useDisclaimer()
  const [loading, setLoading] = useState(true)
  const [_eventConfig, setEventConfig] = useState()
  const [currentRound, setCurrentRound] = useState<number>(1)
  const [rangeTime, setRangeTime] = useState<number>(300)
  const [listEvent, setListEvent] = useState<any>()
  const [currentEventData, setCurrentEventData] = useState<any>()
  const wallet = useWallet()

  const [showBetModal, setShowBetModal] = useState(false)

  const [predictHistory, setPredictHistory] = useState<any[]>([])

  const callGetPredictHistory = async () => {
    try {
      const response = await getPredictHistory()
      if (response) {
        setPredictHistory(response?.data?.items)
      }
    } catch (error) {
      console.log("error:", error)
    }
  }

  const { currentRoundData } = useSelector(
    (state: RootState) => state.priceInfo,
  )
  const currentRoundStored = toBN(currentRoundData?.id || 1).toNumber()

  useEffect(() => {
    callGetPredictHistory()
  }, [currentRoundStored])

  useEffect(() => {
    console.log(
      "======= REFRESH LIST ======= with currentRound is: ",
      currentRoundStored,
    )
    ;(async () => {
      try {
        setLoading(true)
        if (currentEventData && currentRoundStored === currentRound) {
          return
        }
        console.log("wallet", wallet)
        if (wallet) {
          const { eventDataConfig, eventConfigPda } =
            await web3Solana.getEventConfig(wallet)

          console.log("first", eventDataConfig)

          if (eventDataConfig && eventConfigPda) {
            setEventConfig(eventDataConfig as any)
            const currentRound = new BigNumber(
              (eventDataConfig as any).nextRoundId || 2,
            )
              .minus(1)
              .toNumber()

            console.log(
              "currentRound",
              currentRound,
              (eventDataConfig as any).intervalSeconds,
              eventDataConfig,
            )
            setCurrentRound(currentRound)
            setRangeTime((eventDataConfig as any).intervalSeconds || 300)

            // ... expired - expired - expired - live - next(cur) - later - later
            // const startRound = 1977

            const startRound =
              currentRound - (MAX_LIMIT - 1) >= 1
                ? currentRound - (MAX_LIMIT - 1)
                : 1

            const limit =
              currentRound >= MAX_LIMIT ? MAX_LIMIT - 1 : currentRound - 1

            const { eventData: currentEvent } = await web3Solana.getEventData(
              wallet,
              eventConfigPda as any,
              currentRound,
            )
            setCurrentEventData(currentEvent)

            // const { eventData: eventWin, eventPDA: pda } =
            //   await web3Solana.getEventData(wallet, eventConfigPda as any, 68)

            // const order = await web3Solana.getBetInfoByUser(wallet, pda as any)
            // console.log("order", order)

            const eventList = await Promise.all(
              [...new Array(limit + 1)].map((_round, idx) => {
                const roundIdx = startRound + idx
                // console.log("roundIdx", roundIdx)
                return web3Solana.getEventData(
                  wallet,
                  eventConfigPda as any,
                  roundIdx,
                )
              }),
            )

            let userOrders: any = []
            if (wallet.publicKey) {
              userOrders = await Promise.all(
                eventList.map((ev) =>
                  web3Solana.getBetInfoByUser(wallet, ev.eventPDA as any),
                ),
              )
            }

            setListEvent([
              ...eventList.map((e, idx) => {
                return {
                  ...(e.eventData || ({} as any)),
                  userOrder: userOrders[idx],
                }
              }),
              // { ...(eventWin || {}), userOrder: order },
            ])

            console.log("eventList", eventList)
          }
        }
      } catch (error) {
        console.log("error", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [wallet.publicKey, currentRoundData])

  useEffect(() => {
    const handleChartDotClick = () => {
      setIsChangeTransition(true)
      delay(() => setIsChangeTransition(false), 3000)
    }
    swiper?.el?.addEventListener(CHART_DOT_CLICK_EVENT, handleChartDotClick)

    return () => {
      swiper?.el?.removeEventListener(
        CHART_DOT_CLICK_EVENT,
        handleChartDotClick,
      )
    }
  }, [swiper?.el])

  const [, setIsChangeTransition] = useState(false) // isChangeTransition

  return (
    <>
      <BetDisclaimer
        onAccept={onAccept}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <ModalBet
        isOpen={showBetModal}
        closeModal={() => setShowBetModal(false)}
      ></ModalBet>
      {loading ? (
        <div className="flex h-screen max-h-[450px] animate-pulse items-center justify-center gap-10 overflow-x-auto p-6 scrollbar-hide max-md:max-h-[300px] max-md:gap-5">
          <div className="h-full w-full max-w-[320px] rounded-xl bg-[#1f212f]"></div>
          <div className="h-full w-full max-w-[320px] rounded-xl bg-[#1f212f]"></div>
          <div className="h-full w-full max-w-[320px] rounded-xl bg-[#1f212f] max-md:hidden"></div>
        </div>
      ) : (
        <div className="w-full max-md:px-4">
          <Swiper
            // initialSlide={swiperIndex}
            initialSlide={MAX_LIMIT - 2}
            onSwiper={setSwiper}
            spaceBetween={16}
            // slidesPerView={4}
            slidesPerView="auto"
            style={{ paddingTop: 10, paddingBottom: 10 }}
            onBeforeDestroy={() => setSwiper(null)}
            freeMode={{
              enabled: true,
              sticky: true,
              momentumRatio: 0.25,
              momentumVelocityRatio: 0.5,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Virtual, Keyboard, Mousewheel, FreeMode]}
            centeredSlides
            mousewheel
            keyboard
            resizeObserver
          >
            {[
              ...(listEvent || []),
              { id: currentRound + 1, status: STATUS_ROUND.LATER },
              { id: currentRound + 2, status: STATUS_ROUND.LATER },
            ].map((roundItem, key) => {
              const round = toBN(roundItem.id).toNumber()

              let start = toBN(roundItem?.lockTime).toNumber()
              let end = toBN(start)
                .plus(rangeTime || 300)
                .toNumber()

              if (round === currentRound + 1) {
                start = toBN(currentEventData?.startTime).toNumber()
                end = toBN(currentEventData?.lockTime).toNumber()
              }
              if (round === currentRound + 2) {
                start = toBN(currentEventData?.startTime).toNumber()
                end = toBN(currentEventData?.lockTime)
                  .plus(rangeTime || 300)
                  .toNumber() // plus 5 min
              }

              const downAmount = roundItem?.downAmount || 0
              const upAmount = roundItem?.upAmount || 0
              const total = toBN(downAmount).plus(upAmount)
              const lockPrice = toBN(roundItem?.lockPrice || 0)
                .div(10 ** DECIMAL_BTC)
                .toNumber()

              let status = STATUS_ROUND.LATER
              if (round === currentRound) {
                status = STATUS_ROUND.NEXT
              } else if (round === currentRound - 1) {
                status = STATUS_ROUND.LIVE
              } else if (round < currentRound - 1) {
                status = STATUS_ROUND.EXPIRED
              }

              const exitsPredictRecord = predictHistory?.find(
                (item) => item.index === round,
              )

              return (
                <SwiperSlide
                  className="!h-fit"
                  key={`${key}-swiper-${roundItem.round}`}
                >
                  {({ isActive }) => (
                    <CardContainer
                      roundItem={{
                        ...roundItem,
                        status,
                        round,
                        start,
                        end,
                        total,
                        lockPrice,
                        predict: exitsPredictRecord,
                      }}
                      currentRound={currentEventData}
                      isActive={isActive}
                      onClick={() => {
                        if (status === STATUS_ROUND.NEXT) {
                          if (!currentRoundData.userOrder) {
                            // if (!isLoginByWallet) {
                            //   connectMultipleWallet()
                            //   return
                            // }

                            if (!isAccepted) onOpen()
                            else setShowBetModal(true)
                          }
                        }
                      }}
                    />
                  )}
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className="mb-[60px] mt-5 flex items-center justify-center gap-2 max-md:mb-10 max-md:mt-1">
            <div
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-1 border-white bg-mercury-950 hover:brightness-125 max-md:h-7 max-md:w-7"
              onClick={() => swiper.slideTo(swiper.activeIndex - 1, 0)}
            >
              <ArrowsLeftIcon />
            </div>
            <div
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-1 border-white bg-mercury-950 hover:brightness-125 max-md:h-7 max-md:w-7"
              onClick={() => swiper.slideTo(swiper.activeIndex + 1, 0)}
            >
              <ArrowsRightIcon />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SwiperList
