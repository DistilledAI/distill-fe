export enum INTERACTION_FREQUENCY_VALUE {
  Never = 0,
  Occasionally = 3,
  Frequently = 9,
}
export enum INTERACTION_FREQUENCY_CONTENT {
  Never = "Never",
  Occasionally = "Occasionally",
  Frequently = "Frequently",
}

export const INTERACTION_FREQUENCY = [
  {
    value: INTERACTION_FREQUENCY_VALUE.Never,
    title: "Never",
    content: INTERACTION_FREQUENCY_CONTENT.Never,
  },
  {
    value: INTERACTION_FREQUENCY_VALUE.Occasionally,
    title: "Occasionally",
    content: INTERACTION_FREQUENCY_CONTENT.Occasionally,
  },
  {
    value: INTERACTION_FREQUENCY_VALUE.Frequently,
    title: "Frequently",
    content: INTERACTION_FREQUENCY_CONTENT.Frequently,
  },
]
