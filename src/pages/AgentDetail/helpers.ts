import { toast } from "react-toastify"
import { DESC_MAX_LENGTH } from "./GeneralInfo"
import { AgentConfig } from "./useFetchAgentConfig"

const LENGTH_RULES = {
  username: { min: 3, max: 30 },
  clanName: { max: 100 },
  clanDesc: { max: 500 },
  agentDesc: { max: DESC_MAX_LENGTH },
  communicationStyle: { max: 500 },
} as const

const VALIDATION_RULES = {
  username: {
    test: (value: string) =>
      value?.length >= LENGTH_RULES.username.min &&
      value?.length <= LENGTH_RULES.username.max,
    message: `Agent name must be between ${LENGTH_RULES.username.min}-${LENGTH_RULES.username.max} characters`,
  },
  agentDescription: {
    test: (value: string) => value?.length <= LENGTH_RULES.agentDesc.max,
    message: `Agent bio max ${LENGTH_RULES.agentDesc.max} characters`,
  },
  clanNameLength: {
    test: (value: string) => value?.length <= LENGTH_RULES.clanName.max,
    message: `Clan name max ${LENGTH_RULES.clanName.max} characters`,
  },
  clanDescLength: {
    test: (value: string) => value?.length <= LENGTH_RULES.clanDesc.max,
    message: `Clan description max ${LENGTH_RULES.clanDesc.max} characters`,
  },
  clanNameRequired: {
    test: (data: any) => data.clan.name !== "" || data.clan.isEnableClan === 2,
    message: "Clan name is required",
  },
  clanDescRequired: {
    test: (data: any) =>
      data.clan.description !== "" || data.clan.isEnableClan === 2,
    message: "Clan description is required",
  },
  clanImageLive: {
    test: (data: any) =>
      data.clan.imageLive !== null || data.clan.isEnableClan === 2,
    message: "Clan streaming photo or video is required",
  },
  personality: {
    test: (data: any) =>
      data["communication_style"][0] !== "" &&
      data["communication_style"].length !== 0,
    message: "Personality is required",
  },
  communicationStyle: {
    test: (data: any) =>
      data["communication_style"]?.[0].length <=
      LENGTH_RULES.communicationStyle.max,
    message: `Communication Style max ${LENGTH_RULES.communicationStyle.max} characters`,
  },
} as const

export const isPassRuleAgentInfo = (data: any): boolean => {
  const validations = [
    { rule: VALIDATION_RULES.username, value: data.username },
    { rule: VALIDATION_RULES.agentDescription, value: data.description },
    { rule: VALIDATION_RULES.clanNameLength, value: data.clan.name },
    { rule: VALIDATION_RULES.clanDescLength, value: data.clan.description },
    { rule: VALIDATION_RULES.clanNameRequired, value: data },
    { rule: VALIDATION_RULES.clanDescRequired, value: data },
    { rule: VALIDATION_RULES.clanImageLive, value: data },
    { rule: VALIDATION_RULES.personality, value: data },
    { rule: VALIDATION_RULES.communicationStyle, value: data },
  ]

  for (const { rule, value } of validations) {
    if (!rule.test(value)) {
      toast.warning(rule.message)
      return false
    }
  }

  return true
}

export const LIST_AGENT_CONFIG_KEYS = [
  "customization_instruction",
  "audience_profile",
  "interaction_frequency",
  "knowledge_domain",
  "prohibited_topics",
  "response_length",
  "sample_prompts",
  "tone_adaptation",
  "post_interval",
  "category",
  "personality_traits",
  "communication_style",
  "website_link",
  "x_link",
  "telegram_link",
  "agent_describe",
  "x_user_names",
  "x_keywords",
  "autonomous_reply",
  "specific_language",
]

export const getConfigAgentByDataForm = (data: any) => {
  const dt = {
    ...data,
    communication_style: data["communication_style"].map((item: string) =>
      item.replace(/\n/g, ""),
    ),
  }
  return Object.entries(dt)
    .filter(([_, val]) => val !== null && val !== "" && val !== undefined)
    .map(([key, val]) => ({ key, value: val ? val.toString() : "" }))
    .filter((item) => LIST_AGENT_CONFIG_KEYS.includes(item.key))
}

export const getConfigAgentValueByKey = (data: AgentConfig[], key: string) => {
  return data.find((config) => config.key === key)?.value
}

export const getConfigAgentValueByKeys = (
  data: AgentConfig[],
  keys: string[],
) => {
  const values = keys.map((key) => ({
    [key]: data.find((dt) => dt.key === key)?.value || "",
  }))
  return values.reduce((acc, obj) => ({ ...acc, ...obj }), {})
}
