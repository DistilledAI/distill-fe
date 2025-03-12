import { SocialLinkIcon } from "@components/Icons/SocialLinkIcon"
import { TrashXIcon } from "@components/Icons/TrashXIcon"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import CreatPrivateAgentModal from "../Modal/CreatPrivateAgentModal"
import UploadDataButton from "../UploadDataButton"
import useDeleteData from "@pages/MyData/DeleteData/useDelete"

const UploadSocialLink: React.FC<{ moreCustomRequest: any }> = ({
  moreCustomRequest,
}) => {
  const { botId } = useParams()
  const [socialUrls, setSocialUrls] = useState<string[]>([])
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const { onDelete } = useDeleteData()

  const handlemSetSocialUrls = (newUrl: string) => {
    setSocialUrls([...socialUrls, newUrl])
  }

  const handleRemoveLink = async (record: any) => {
    await onDelete({ botId: Number(botId), ids: [record?.id] })
    //set display value
    const newFileList = socialUrls?.filter(
      (item: any) => item.uid !== record?.uid,
    )
    setSocialUrls(newFileList)
  }

  return (
    <>
      <UploadDataButton
        icon={<SocialLinkIcon />}
        label="Website Links/Social Media"
        textClassName="text-base-14-b"
        onClick={() => setOpenPopup(true)}
      >
        {socialUrls.length > 0 && (
          <div className="max-h-[150px] overflow-auto p-3">
            {socialUrls.map((item: any, index: number) => {
              const isError = item?.status === "error"

              return (
                <div
                  className="mb-3 grid w-full grid-cols-8 items-center gap-3"
                  key={index}
                >
                  {isError ? (
                    <div className="group col-span-7">
                      <span className="text-base-14-sb text-[#FF3B30]">
                        {item?.link}
                      </span>
                    </div>
                  ) : (
                    <Link
                      target="_blank"
                      to={item?.link}
                      className="col-span-7 max-w-[250px] truncate hover:underline"
                    >
                      <span className="text-base-14-sb">{item?.link}</span>
                    </Link>
                  )}

                  <div
                    className="cursor-pointer"
                    onClick={() => handleRemoveLink(item)}
                  >
                    <TrashXIcon />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </UploadDataButton>

      <CreatPrivateAgentModal
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        handlemSetSocialUrls={handlemSetSocialUrls}
        moreCustomRequest={moreCustomRequest}
      />
    </>
  )
}
export default UploadSocialLink
