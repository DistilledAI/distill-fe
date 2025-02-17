import DotLoading from "@components/DotLoading"
import { ChevronDownIcon } from "@components/Icons/ChevronDownIcon"
import { CloseFilledIcon } from "@components/Icons/DefiLens"
import {
  cn,
  Modal,
  ModalBody,
  ModalContent,
  Pagination,
  PaginationItemType,
  Select,
  SelectItem,
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
import TweetEmbed from "react-tweet-embed"
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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [paramsValues, setParamsValues] = useState<any>({ botId: 1810 })

  const [sourceValue, setSourceValue] = useState<string>(DatasourceEnum.NEWS)
  const [dateKey, setDateKey] = useState<string>("30days")

  const { agentReplyData } = useFetchAgentReply({
    filter: JSON.stringify(paramsValues),
  })

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

  const totalPages = 100
  const page = 1
  const onPageChange = () => {}

  const renderPagination = () => {
    return agentReplyData ? (
      <Pagination
        showControls
        initialPage={1}
        radius="full"
        renderItem={renderItem}
        total={totalPages}
        variant="light"
        classNames={{
          base: "flex justify-center mt-2",
          cursor: "bg-lgd-code-hot-ramp font-bold",
        }}
        onChange={onPageChange}
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

      case ColumnKey.metadata:
        return (
          <div className="">
            <span>{item.metadata.sourceTitle}</span>
            <span>{item.metadata.tweetedContent}</span>
          </div>
        )

      default:
        return (
          <div className="w-[500px]">
            <TweetEmbed
              tweetId="1891177886125891729"
              placeholder={<DotLoading />}
              options={{ cards: "hidden" }}
            />
          </div>
        )
    }
  }

  return (
    <div>
      <Modal
        isOpen={true}
        onOpenChange={onOpenChange}
        hideCloseButton
        classNames={{
          base: "bg-[#E6E6E6]",
        }}
        size="5xl"
      >
        <ModalContent>
          <ModalBody>
            <div className="relative mt-4 w-auto pb-2">
              <div className="flex-items-center mb-6 justify-between">
                <div className="flex w-full justify-center">
                  <span className="flex items-center text-24 font-semibold text-mercury-950">
                    Replies Dashboard
                  </span>
                </div>
                <div className="cursor-pointer" onClick={onOpenChange}>
                  <CloseFilledIcon />
                </div>
              </div>

              <div className="">
                <div className="flex items-center">
                  <div className="w-1/2">
                    <span className="text-base-b text-mercury-950">
                      Replies History
                    </span>
                  </div>
                  <div className="flex w-1/2 items-center gap-4">
                    <Select
                      className="w-[40%]"
                      classNames={{
                        trigger: "rounded-full !bg-white h-[50px]",
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
                        <SelectItem key={item.key}>{item.label}</SelectItem>
                      ))}
                    </Select>

                    <Select
                      className="w-[60%]"
                      classNames={{
                        trigger: "rounded-full !bg-white h-[50px]",
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
                        <SelectItem key={item.value}>{item.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <Table
                  isHeaderSticky
                  aria-label="stake table"
                  classNames={{
                    base: "mt-4 md:mt-6  max-h-[600px] overflow-auto",
                    wrapper:
                      "shadow-none border-1 border-mercury-100 rounded-[22px] gap-0 bg-white md:bg-mercury-30 pb-0",
                    thead: [
                      "h-9 [&>tr]:first:shadow-none",
                      "before:absolute before:bottom-0 before:w-full before:border-b-1 before:border-mercury-100",
                    ].join(" "),
                    th: "bg-transparent h-5 p-0 pr-4 text-base font-normal text-mercury-600",
                    td: "pl-0 pr-3 py-4",
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
                      <TableRow key={item.id} className="flex">
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
    </div>
  )
}
export default RepliesDashboard
