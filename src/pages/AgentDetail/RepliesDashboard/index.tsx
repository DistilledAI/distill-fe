import { LinkAccountIcon } from "@components/Icons"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import {
  Button,
  Card,
  cn,
  Modal,
  ModalBody,
  ModalContent,
  Pagination,
  PaginationItemType,
  Select,
  SelectItem,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react"
import moment from "moment"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { TwitterTweetEmbed } from "react-twitter-embed"
import { twMerge } from "tailwind-merge"
import useFetchAgentReply from "./useFetchAgentReply"

enum DatasourceEnum {
  NEWS = "news",
  TWITTER_CATEGORY_KOLS = "twitter_category_kols",
  TWITTER_FOLLOWING_KOLS = "twitter_following_kols",
}

const DataSource = [
  {
    label: "News",
    value: DatasourceEnum.NEWS,
  },
  {
    label: "Twitter category KOLs",
    value: DatasourceEnum.TWITTER_CATEGORY_KOLS,
  },
  {
    label: "Twitter following KOLs",
    value: DatasourceEnum.TWITTER_FOLLOWING_KOLS,
  },
]

enum ColumnKey {
  createdAt = "createdAt",
  replyXUserId = "replyXUserId",
  sourceUrl = "sourceUrl",
  metadata = "metadata",
}

const columns = [
  {
    key: ColumnKey.createdAt,
    label: "Date",
  },
  {
    key: ColumnKey.replyXUserId,
    label: "Reply",
  },
  {
    key: ColumnKey.metadata,
    label: "Scource",
  },
]

const today = new Date()
const last30Days = new Date()
const last60Days = new Date()
const last90Days = new Date()

last30Days.setDate(today.getDate() - 30)
last60Days.setDate(today.getDate() - 60)
last90Days.setDate(today.getDate() - 90)

const DateOptions = [
  {
    label: "Last 30 days",
    startDate: today.toISOString(),
    endDate: last30Days.toISOString(),
    key: "30days",
  },
  {
    label: "Last 60 days",
    startDate: today.toISOString(),
    endDate: last60Days.toISOString(),
    key: "60days",
  },
  {
    label: "Last 90 days",
    startDate: today.toISOString(),
    endDate: last90Days.toISOString(),
    key: "90days",
  },
]

const RepliesDashboard: React.FC = () => {
  const { agentId } = useParams()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [paramsValues, setParamsValues] = useState<any>({ botId: agentId })
  const [sourceValue, setSourceValue] = useState<string>(DatasourceEnum.NEWS)
  const [dateKey, setDateKey] = useState<string>("30days")
  const [page, setPage] = useState<number>(1)
  const [offset, setOffset] = useState<number>(0)

  const { agentReplyData, totalPages } = useFetchAgentReply({
    filter: JSON.stringify(paramsValues),
    offset,
  })

  const onPageChange = async (page: number) => {
    const offset = page * 10
    setPage(page)
    setOffset(offset)
  }

  const onSourceChange = (value: string) => {
    setSourceValue(value)
    setParamsValues({
      ...paramsValues,
      sourceType: value,
    })
  }

  const onDateChange = (value: string) => {
    const exitsVal = DateOptions.find((item) => item.key == value)
    setDateKey(value)
    setParamsValues({
      ...paramsValues,
      startDate: exitsVal?.startDate,
      endDate: exitsVal?.endDate,
    })
  }

  const renderItem = ({
    ref,
    key,
    value,
    onNext,
    onPrevious,
    setPage,
    className,
  }: any) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, "h-8 w-8 min-w-8 -rotate-90 bg-mercury-70")}
          onClick={onNext}
        >
          <ChevronDownIcon />
        </button>
      )
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, "h-8 w-8 min-w-8 rotate-90 bg-mercury-70")}
          onClick={onPrevious}
        >
          <ChevronDownIcon />
        </button>
      )
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      )
    }

    return (
      <button
        key={key}
        ref={ref}
        className={className}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    )
  }

  const renderPagination = () => {
    return agentReplyData ? (
      <Pagination
        showControls
        initialPage={1}
        radius="full"
        renderItem={renderItem}
        variant="light"
        classNames={{
          base: "flex justify-center mt-2",
          cursor: "bg-lgd-code-hot-ramp font-bold",
        }}
        onChange={onPageChange}
        total={totalPages}
        page={page}
      />
    ) : null
  }

  const renderCell = (item: Record<string, any>, columnKey: string) => {
    switch (columnKey) {
      case ColumnKey.createdAt:
        return (
          <div className="w-[80px]">
            <span className="text-14 font-medium text-mercury-900">
              {moment(item.createdAt).format("ll")}
            </span>
          </div>
        )

      case ColumnKey.replyXUserId:
        const tweetedUrl = item?.tweetedUrl
        const match = tweetedUrl.match(/status\/(\d+)/)
        const tweetId = match?.[1]

        return (
          <div className="w-[400px]">
            <TwitterTweetEmbed
              tweetId={tweetId}
              options={{ cards: "hidden" }}
              placeholder={
                <Card
                  className="mt-0 h-[300px] w-[400px] space-y-5 p-4"
                  radius="lg"
                >
                  <Skeleton className="rounded-lg">
                    <div className="h-24 rounded-lg bg-default-300" />
                  </Skeleton>
                  <div className="space-y-3">
                    <Skeleton className="w-3/5 rounded-lg">
                      <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-4/5 rounded-lg">
                      <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                    </Skeleton>
                    <Skeleton className="w-2/5 rounded-lg">
                      <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                    </Skeleton>
                  </div>
                </Card>
              }
            />
          </div>
        )

      default:
        return (
          <div>
            <div className="flex flex-col">
              <span className="text-base-b mb-1">
                {item.metadata.sourceTitle}
              </span>
              <span className="text-18 text-base font-medium text-mercury-900">
                {item.shortDescription}...
              </span>
            </div>

            <Button
              className="mt-4 min-w-[90px] rounded-full bg-mercury-950 text-[15px] font-medium text-white"
              onPress={() => window.open(item.sourceUrl, "_blank")}
            >
              View Data Source
            </Button>
          </div>
        )
    }
  }

  const onCloseModal = () => {
    setSourceValue(DatasourceEnum.NEWS)
    setDateKey("30days")
    setPage(1)
    setOffset(0)
    setParamsValues({
      ...paramsValues,
      sourceType: DatasourceEnum.NEWS,
      startDate: today.toISOString(),
      endDate: last30Days.toISOString(),
    })
    onOpenChange()
  }

  return (
    <>
      <div
        className="flex cursor-pointer items-center gap-2 hover:underline"
        onClick={() => onOpen()}
      >
        <LinkAccountIcon />
        <span className="text-base-md text-brown-10">
          View Replies Dashboard
        </span>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onCloseModal}
        hideCloseButton
        classNames={{
          base: "bg-[#E6E6E6]",
        }}
        size="5xl"
      >
        <ModalContent>
          <ModalBody>
            <div className="relative w-auto pb-2 max-md:p-0">
              <div className="flex-items-center mb-6 justify-between max-md:mb-3">
                <div className="flex w-full justify-center">
                  <span className="flex items-center text-24 font-semibold text-mercury-950">
                    Replies Dashboard
                  </span>
                </div>
                <div className="cursor-pointer" onClick={onCloseModal}>
                  <CloseFilledIcon />
                </div>
              </div>

              <div className="">
                <div className="flex items-center max-md:flex-col max-md:items-start">
                  <div className="w-1/2 max-md:mb-2">
                    <span className="text-base-b text-mercury-950">
                      Replies History
                    </span>
                  </div>
                  <div className="flex w-1/2 items-center gap-4 max-md:w-full max-md:justify-between max-md:gap-1">
                    <Select
                      className="w-[40%]"
                      classNames={{
                        trigger: "rounded-full !bg-white h-[50px]",
                        value: "text-base text-mercury-95 font-semibold",
                      }}
                      disableSelectorIconRotation
                      selectionMode="single"
                      startContent={
                        <div>
                          <span className="text-base-b text-mercury-700">
                            Date:{" "}
                          </span>
                        </div>
                      }
                      selectedKeys={[dateKey]}
                      onChange={(e) => onDateChange(e.target.value)}
                    >
                      {DateOptions.map((item) => (
                        <SelectItem
                          key={item.key}
                          classNames={{
                            title: "text-base text-mercury-95 font-semibold",
                          }}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>

                    <Select
                      className="w-[60%]"
                      classNames={{
                        trigger: "rounded-full !bg-white h-[50px]",
                        value: "text-base text-mercury-95 font-semibold",
                      }}
                      selectedKeys={[sourceValue]}
                      disableSelectorIconRotation
                      selectionMode="single"
                      startContent={
                        <div>
                          <span className="text-base-b text-mercury-700">
                            Source:{" "}
                          </span>
                        </div>
                      }
                      onChange={(e) => onSourceChange(e.target.value)}
                    >
                      {DataSource.map((item) => (
                        <SelectItem
                          key={item.value}
                          classNames={{
                            title: "text-base text-mercury-95 font-semibold",
                          }}
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <Table
                  aria-label="stake table"
                  classNames={{
                    base: "mt-4 md:mt-6 max-h-[600px] overflow-auto h-[800px]",
                    wrapper:
                      "shadow-none border-1 border-mercury-100 rounded-[22px] gap-0 bg-white md:bg-mercury-30 pb-0",
                    thead: [
                      "h-9 [&>tr]:first:shadow-none",
                      "before:absolute before:bottom-0 before:w-full before:border-b-1 before:border-mercury-100",
                    ].join(" "),
                    th: "bg-transparent h-10 p-0 pr-4 text-base font-normal text-mercury-600",
                    td: "pl-0 pr-3 py-4 align-top",
                    tbody: "[&>tr:first-child>td]:pt-4",
                    emptyWrapper: "h-10",
                    sortIcon: "ml-1 text-[#363636]",
                  }}
                  bottomContentPlacement="outside"
                >
                  <TableHeader columns={columns}>
                    {(column) => (
                      <TableColumn
                        className={twMerge("data-[hover=true]:text-[#363636]")}
                        key={column.key}
                      >
                        {column.label}
                      </TableColumn>
                    )}
                  </TableHeader>

                  <TableBody
                    items={agentReplyData}
                    emptyContent={
                      <div className="pb-6 pt-4 text-base text-mercury-600">
                        Empty
                      </div>
                    }
                  >
                    {(item) => (
                      <TableRow key={item.id}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCell(item, columnKey as string)}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {renderPagination()}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default RepliesDashboard
