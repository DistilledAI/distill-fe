import { FilledShieldCheckedIcon } from "@components/Icons/FilledShieldCheck"
import { InfoCircleIcon } from "@components/Icons/InfoCircleIcon"
import useWindowSize from "@hooks/useWindowSize"
import { BotDataTypeKey } from "@types"
import AddData from "./AddData"
import CvData from "./Cv"
import FileData from "./File"
import LinkData from "./Link"
// import MediaData from "./Media"
import TxtData from "./Txt"
import useFetchMyData from "./useFetch"
import useUpdateStatus from "./useUpdateStatus"
import HeaderMobileBack from "@components/HeaderMobileBack"
import FaqData from "./Faq"

const MyData: React.FC = () => {
  const { isMobile } = useWindowSize()
  const { list, isFetched, botId } = useFetchMyData()
  useUpdateStatus(botId)

  return (
    <div className="mx-auto max-w-[800px] px-4 py-5 max-md:min-h-dvh max-md:bg-mercury-70 max-md:pt-[70px]">
      {isMobile ? (
        <HeaderMobileBack
          title="My Data"
          rightContent={<AddData botId={botId} />}
        />
      ) : (
        <div className="mb-10 flex items-center justify-between">
          <div className="text-mercury-950">
            <h3 className="mb-1 flex items-center gap-2 text-24 font-semibold">
              My data <FilledShieldCheckedIcon size={20} color="#A2845E" />
            </h3>
          </div>
          <AddData botId={botId} />
        </div>
      )}
      {list.length === 0 && isFetched && (
        <div className="mb-6 flex items-center gap-6 rounded-lg border border-brown-500 bg-brown-50 px-4 py-2">
          <div className="flex items-center gap-2">
            <div>
              <InfoCircleIcon size={16} color="#83664B" />
            </div>
            <p className="text-14 font-medium text-brown-600 md:text-16">
              Since no data has been added, your agent lacks personalized
              intelligence. <br /> Please add your data to help your agent learn
              more about you.
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-6">
        <LinkData botId={botId} category={BotDataTypeKey.SOCIAL_MEDIA} />
        <FileData botId={botId} category={BotDataTypeKey.PDF_FILE} />
        <CvData botId={botId} category={BotDataTypeKey.CV_FILE} />
        {/* <MediaData botId={botId} category={BotDataTypeKey.PHOTO_VIDEO_FILE} /> */}
        <TxtData botId={botId} category={BotDataTypeKey.TXT_FILE} />
        <FaqData botId={botId} category={BotDataTypeKey.FAQ} />
      </div>
    </div>
  )
}
export default MyData
