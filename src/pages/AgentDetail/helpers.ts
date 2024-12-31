import { toast } from "react-toastify"
import { DESC_MAX_LENGTH } from "./GeneralInfo"
import { AgentConfig } from "./useFetchAgentConfig"

export const isPassRuleAgentInfo = (data: any) => {
  const isUsernameLengthPass =
    data["username"]?.length >= 4 && data["username"]?.length <= 30
  const isDescLengthPass = data["description"]?.length <= DESC_MAX_LENGTH
  if (!isUsernameLengthPass) {
    toast.warning("Agent name within 4-30 characters")
    return false
  }
  if (!isDescLengthPass) {
    toast.warning(`Agent description max ${DESC_MAX_LENGTH} characters`)
    return false
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
]

export const getConfigAgentByDataForm = (data: any) => {
  return Object.entries(data)
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
