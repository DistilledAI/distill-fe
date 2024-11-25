export enum INTERACTION_FREQUENCY_KEY {
  Never = "Never",
  Occasionally = "Occasionally",
  Frequently = "Frequently",
}

export const INTERACTION_FREQUENCY = [
  {
    key: INTERACTION_FREQUENCY_KEY.Never,
    title: "Never",
  },
  {
    key: INTERACTION_FREQUENCY_KEY.Occasionally,
    title: "Occasionally",
  },
  {
    key: INTERACTION_FREQUENCY_KEY.Frequently,
    title: "Frequently",
  },
]

export enum RESPONSE_LENGTH_KEY {
  Brief = "Brief",
  Moderate = "Moderate",
  Detailed = "Detailed",
}

export enum RESPONSE_LENGTH_VALUE {
  Brief = 0,
  Moderate = 3,
  Detailed = 6,
}

export const RESPONSE_LENGTH = [
  {
    key: RESPONSE_LENGTH_KEY.Brief,
    title: "Brief",
    value: RESPONSE_LENGTH_VALUE.Brief,
  },
  {
    key: RESPONSE_LENGTH_KEY.Moderate,
    title: "Moderate",
    value: RESPONSE_LENGTH_VALUE.Moderate,
  },
  {
    key: RESPONSE_LENGTH_KEY.Detailed,
    title: "Detailed",
    value: RESPONSE_LENGTH_VALUE.Detailed,
  },
]
