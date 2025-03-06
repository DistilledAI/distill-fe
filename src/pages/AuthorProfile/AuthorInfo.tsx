import AvatarCustom from "@components/AvatarCustom"
import { PATH_NAMES } from "@constants/index"
import { Skeleton } from "@nextui-org/react"
import ShareProfile from "@pages/Account/ShareProfile"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getUserPublicDetail } from "services/user"
import { twMerge } from "tailwind-merge"
import { QueryDataKeys } from "types/queryDataKeys"

const AuthorInfo = () => {
  const { authorId } = useParams()
  const { data, isFetched } = useQuery({
    queryKey: [QueryDataKeys.USER_PUBLIC_DETAIL, authorId],
    queryFn: () => getUserPublicDetail(Number(authorId)),
    enabled: !!authorId,
  })

  const authorInfo = data?.data

  return (
    <div className="w-full bg-lgd-muted-beige px-4 py-3">
      <div className="mx-auto flex w-full max-w-[768px] flex-wrap gap-x-4">
        <div className="flex flex-1 gap-x-4">
          <Skeleton isLoaded={isFetched} className="rounded-full">
            <AvatarCustom
              publicAddress={authorInfo?.publicAddress}
              src={authorInfo?.avatar}
            />
          </Skeleton>
          <div>
            <Skeleton isLoaded={isFetched} className="rounded">
              <h3 className="text-24 font-semibold text-mercury-950">
                {authorInfo?.username || "Anonymous"}
              </h3>
            </Skeleton>
            <Skeleton
              isLoaded={isFetched}
              className={twMerge("rounded", !isFetched && "mt-1")}
            >
              <p className="line-clamp-4 text-16 font-medium text-mercury-900 md:line-clamp-6">
                {authorInfo?.description || "-"}
              </p>
            </Skeleton>
          </div>
        </div>
        <div className="max-md:mt-2 max-md:w-full">
          <ShareProfile
            textButton="Share as QR"
            titleShareQRModal="Author QR"
            isDisabled={!authorInfo}
            shareUrl={`${window.location.origin}${PATH_NAMES.AUTHOR_PROFILE}/${authorId}`}
          />
        </div>
      </div>
    </div>
  )
}

export default AuthorInfo
