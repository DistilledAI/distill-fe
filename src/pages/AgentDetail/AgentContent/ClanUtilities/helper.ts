import { ClanData } from "./types"

export const transformClanData = (clan: ClanData | undefined) =>
  clan
    ? Object.keys(clan)
        .filter((key) => key !== "imageLive" && key !== "videoLive")
        .map((key) => ({
          type: "clan" as const,
          key,
          value: clan[key as keyof ClanData],
        }))
    : []
