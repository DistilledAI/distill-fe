export enum CommandActionKey {
  swap = "swap",
  send = "send",
  lock = "lock",
}

export type LockDataInput = {
  fromToken: string
  amount: string
  duration: number
}
export type SwapDataInput = {
  fromToken: string
  toToken: string
  amount: string
}

export type InfoAction = null | {
  key: CommandActionKey
  data: {
    lock?: LockDataInput
    swap?: SwapDataInput
  }
}
