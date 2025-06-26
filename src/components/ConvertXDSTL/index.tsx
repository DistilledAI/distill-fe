import CloseButton from "@components/CloseButton"
import { Input, Modal, ModalContent, Spinner } from "@nextui-org/react"
import { numberWithCommas } from "@utils/format"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { convertXDSTLToUSDI } from "services/point"

const convertXdstlToUsdai = (xDstlPoint: number) => {
  if (!xDstlPoint || xDstlPoint === 0) return 0

  const usdaiAmount = xDstlPoint / 1000
  return usdaiAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Function to validate Oraichain wallet address
const isValidOraichainAddress = (address: string): boolean => {
  if (!address || address.trim() === "") return false
  return address.toLowerCase().startsWith("orai")
}

// Form data interface
interface ConvertFormData {
  walletAddress: string
}

const ConvertXDSTL: React.FC<{
  totalxDstlPoint: number
  isOpen: boolean
  onClose: () => void
  convertStatusData: any
  setIsRefreshStatus: (a: boolean) => void
  isRefreshStatus: boolean
}> = ({
  totalxDstlPoint,
  isOpen,
  onClose,
  convertStatusData,
  setIsRefreshStatus,
  isRefreshStatus,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const status = convertStatusData?.status

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ConvertFormData>({
    defaultValues: {
      walletAddress: "",
    },
  })

  const onSubmit = async (data: ConvertFormData) => {
    try {
      setLoading(true)
      const res = await convertXDSTLToUSDI(data.walletAddress)
      if (res) {
        toast.success("Convert successfully")
        reset() // Reset form after successful conversion
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    } finally {
      setLoading(false)
      setIsRefreshStatus(!isRefreshStatus)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton
      classNames={{
        wrapper: "overflow-hidden z-[51]",
        base: "bg-mercury-100",
        backdrop: "z-[51]",
      }}
      size="2xl"
    >
      <ModalContent>
        <div className="p-6 max-sm:px-4">
          <CloseButton
            onClose={onClose}
            className="absolute right-5 top-4 z-[1]"
          />

          {status && status !== "active" ? (
            <>
              <div className="mx-auto space-y-6 p-8 text-mercury-950">
                <h2 className="text-center text-[30px] font-bold">
                  Convert xDSTL
                </h2>
                <p className="text-center text-[16px] font-medium">
                  Convert your{" "}
                  <span className="font-bold">
                    {numberWithCommas(totalxDstlPoint)} xDSTL
                  </span>{" "}
                  to{" "}
                  <span className="font-bold">
                    ${convertXdstlToUsdai(totalxDstlPoint)} USDAI
                  </span>{" "}
                  Trial Funds
                </p>

                {status === "pending" && (
                  <div className="rounded-md bg-yellow-100 px-4 py-2 text-[18px] text-yellow-800">
                    <strong>Pending:</strong> xDSTL → USDAI on LFG!!!
                  </div>
                )}

                {status === "claimed" && (
                  <div className="ext-[18px] rounded-md bg-green-100 px-4 py-2 text-green-800">
                    <strong>xDSTL converted successfully.</strong>{" "}
                    <a
                      href="https://lfg.app.link/home"
                      className="font-semibold text-green-700 underline"
                      target="_blank"
                    >
                      Open LFG!!!
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="mx-auto space-y-6 p-8 text-mercury-950">
              <h2 className="text-center text-[30px] font-bold">
                Convert xDSTL
              </h2>
              <p className="text-center text-[16px] font-medium">
                Convert your{" "}
                <span className="font-bold">
                  {numberWithCommas(totalxDstlPoint)} xDSTL
                </span>{" "}
                to{" "}
                <span className="font-bold">
                  ${convertXdstlToUsdai(totalxDstlPoint)} USDAI
                </span>{" "}
                Trial Funds
              </p>

              <div>
                <label className="mb-2 block font-medium">
                  Fill your Oraichain wallet address on LFG!!!
                </label>

                <Input
                  type="text"
                  placeholder="orai..."
                  className="w-full"
                  classNames={{
                    // mainWrapper: "border border-mercury-400 rounded-lg",
                    inputWrapper: "bg-mercury-70",
                  }}
                  {...register("walletAddress", {
                    required: "Wallet address is required",
                    validate: {
                      isValidOraichain: (value) =>
                        isValidOraichainAddress(value) ||
                        "Please enter a valid Oraichain wallet address (must start with 'orai')",
                    },
                  })}
                  isInvalid={!!errors.walletAddress}
                  errorMessage={errors.walletAddress?.message}
                />
              </div>

              <div className="text-[15px]">
                <h2 className="text-[18px] font-bold text-mercury-950">
                  How can I get the wallet address?
                </h2>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-mercury-900">
                  <li>
                    <a
                      href="https://lfg.app.link/home"
                      className="font-bold text-[#4986C9] hover:underline"
                      target="_blank"
                    >
                      Download LFG!!!
                    </a>
                  </li>
                  <li>Sign in and create your account.</li>
                  <li>Tap the settings icon in the top-right corner.</li>
                  <li>Tap "Wallets".</li>
                  <li>Tap the copy icon next to your Oraichain address.</li>
                </ol>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-mercury-950 py-3 font-semibold text-mercury-30 transition disabled:cursor-not-allowed disabled:opacity-50 aria-checked:bg-mercury-900"
                  disabled={loading}
                  aria-checked={loading}
                >
                  {loading && (
                    <Spinner
                      size="sm"
                      classNames={{
                        circle1: "border-[#E7E0D7] ",
                      }}
                    />
                  )}
                  Convert
                </button>
              </form>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ConvertXDSTL
