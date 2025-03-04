export enum CLAN_CONFIG_KEYS {
  DESCRIPTION = "description",
  LABEL = "label",
  TRADE_LINK = "tradeLink",
  CONTRACT_ADDRESS = "contractAddress",
  X = "x_link",
  TELEGRAM = "telegram_link",
  IMAGES_LIVE = "imageLive",
  VIDEO_LIVE = "videoLive",
  AUDIO_LIVE = "audioLive",
  IS_PREDICTION = "isPrediction",
  IS_ENABLE_CLAN = "isEnableClan",
  WEBSITE = "website_link",
}

export interface ClanData {
  description: string
  name: string
  imageLive: File | null
  isEnableClan: number
}

export interface TransformedClanItem {
  type: "clan"
  key: string
  value: any
}
