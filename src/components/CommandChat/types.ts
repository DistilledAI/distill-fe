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

export type InfoAction = null | { key: CommandActionKey; data: LockDataInput }
