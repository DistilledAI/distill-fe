export const PATH_NAMES = {
  HOME: "/",
  LLM: "/chatbot",
  CHAT: "/chat",
  LIVE: "/live",
  CLAN: "/clan",
  CHAT_DETAIL: "/chat/:chatId",
  INVITE: "/invite",
  NOT_FOUND: "/not-found",
  PRIVATE_AGENT: "/private-agent",
  MARKETPLACE: "/marketplace",
  MY_DATA: "/my-data",
  ADD_MY_DATA: "/add-my-data",
  ACCOUNT: "/account",
  AUTHOR_PROFILE: "/author",
  AGENT_DETAIL: "/agent",
  CREATE_AGENT: "/create-agent",
  MY_AGENTS: "/my-agents",
  REWARDS: "/rewards",
  TRENDING: "/trending",
  ORCHESTRATION: "/orchestration",
  STAKING: "/staking",
}

export const MIX_PANEL_TRACK_EVENT = {
  OPEN_WIDGET: "Open_Widget",
  CLOSE_WIDGET: "Close_Widget",
  SEND_MESSAGE_WIDGET: "Send_Message_Widget",
}

export const SITE_LLM_SUPPORTED = {
  LAYER: "layer",
  ORAI: "orai",
  ORAIDEX: "oraidex",
}

export const DISTILLED_AI_URL = "https://distilled.ai/"

export enum RoleUser {
  ADMIN = 1,
  USER = 2,
  BANNED = 3,
  BOT = 4,
  ANONYMOUS = 5,
  SUPER_ADMIN = 10,
}

export enum Publish {
  Published = 1,
  Unpublished = 0,
}

export const STATUS_AGENT = {
  ACTIVE: 1,
  SUSPENDED: 2,
  DELETED: 3,
  PENDING: 4,
}

export enum MY_DATA_STATUS {
  ACTIVE = 1,
  PROCESSING = 0,
  RESOLVED = 4,
  SUSPENDED = 2,
  DELETED = 3,
}

export enum TYPE_BOT {
  VOICE = 2,
  NONE = -1,
}

export const ACTIVE_COLORS = [
  {
    bgColor: "bg-lgd-code-agent-1",
    borderColor: "border-code-agent-1",
    textColor: "text-code-agent-1",
  },
  {
    bgColor: "bg-lgd-code-agent-2",
    borderColor: "border-code-agent-2",
    textColor: "text-code-agent-2",
  },
  {
    bgColor: "bg-lgd-code-agent-3",
    borderColor: "border-code-agent-3",
    textColor: "text-code-agent-3",
  },
  {
    bgColor: "bg-lgd-code-agent-4",
    borderColor: "border-code-agent-4",
    textColor: "text-code-agent-4",
  },
  {
    bgColor: "bg-lgd-code-agent-5",
    borderColor: "border-code-agent-5",
    textColor: "text-code-agent-5",
  },
  {
    bgColor: "bg-lgd-code-agent-6",
    borderColor: "border-code-agent-6",
    textColor: "text-code-agent-6",
  },
  {
    bgColor: "bg-lgd-code-agent-7",
    borderColor: "border-code-agent-7",
    textColor: "text-code-agent-7",
  },
]

export const MAP_DISPLAY_FROM_STATUS_MY_AGENT = {
  [STATUS_AGENT.PENDING]: {
    label: "Awaiting creation",
    color: "#FF9500",
  },
  [STATUS_AGENT.ACTIVE]: {
    label: "Active",
    color: "#34C759",
  },
}

export const PERSONALITY_LIST = [
  {
    emoji: "⭐️",
    label: "Custom",
    selected: false,
    value: "personality_traits",
    type: "custom",
  },
  {
    emoji: "😊",
    label: "Friendly",
    selected: false,
    value: `Friendly: "Connects with users through warmth, empathy, and approachable communication."`,
    desc: "Connects with users through warmth, empathy, and approachable communication.",
  },
  {
    emoji: "💼",
    label: "Professional",
    selected: false,
    value: `Professional: "Delivers precise, insightful, and high-quality responses with confidence."`,
    desc: "Delivers precise, insightful, and high-quality responses with confidence.",
  },
  {
    emoji: "🤡",
    label: "Humorous",
    selected: false,
    value: `Humorous: "Sprinkles humor into conversations while staying helpful and engaging."`,
    desc: "Sprinkles humor into conversations while staying helpful and engaging.",
  },
  {
    emoji: "🛟",
    label: "Supportive",
    selected: false,
    value: `Supportive: "Guides users with patience, encouragement, and unwavering care."`,
    desc: "Guides users with patience, encouragement, and unwavering care.",
  },
  {
    emoji: "🥰",
    label: "Empathetic",
    selected: false,
    value: `Empathetic: "Tunes into emotions to provide thoughtful and understanding responses."`,
    desc: "Tunes into emotions to provide thoughtful and understanding responses.",
  },
  {
    emoji: "🤓",
    label: "Informative",
    selected: false,
    value: `Informative: "Offers accurate, well-explained knowledge in a clear and concise manner."`,
    desc: "Offers accurate, well-explained knowledge in a clear and concise manner.",
  },
  {
    emoji: "🤠",
    label: "Adventurous",
    selected: false,
    value: `Adventurous: "Sparks excitement and curiosity, inspiring users to explore new ideas."`,
    desc: "Sparks excitement and curiosity, inspiring users to explore new ideas.",
  },
]

export const COMMUNICATION_STYLE_LIST = [
  {
    emoji: "⭐️",
    label: "Custom",
    selected: false,
    value: "communication_style",
    type: "custom",
  },
  {
    emoji: "👔",
    label: "Formal",
    selected: false,
    value: `Formal: "Communicates with professionalism, clarity, and respect, adhering to proper etiquette."`,
    desc: "Communicates with professionalism, clarity, and respect, adhering to proper etiquette.",
  },
  {
    emoji: "🧢",
    label: "Casual",
    selected: false,
    value: `Casual: "Engages in a relaxed and conversational tone, keeping interactions light and approachable."`,
    desc: "Engages in a relaxed and conversational tone, keeping interactions light and approachable.",
  },
  {
    emoji: "🔥",
    label: "Enthusiastic",
    selected: false,
    value: `Enthusiastic: "Delivers responses with energy, excitement, and a motivating attitude."`,
    desc: "Delivers responses with energy, excitement, and a motivating attitude.",
  },
  {
    emoji: "🍃",
    label: "Calm",
    selected: false,
    value: `Calm: "Maintains a soothing and composed tone, creating a sense of ease and reassurance."`,
    desc: "Maintains a soothing and composed tone, creating a sense of ease and reassurance.",
  },
  {
    emoji: "👀",
    label: "Direct",
    selected: false,
    value: `Direct: "Provides clear and straightforward answers, cutting through complexity with precision."`,
    desc: "Provides clear and straightforward answers, cutting through complexity with precision.",
  },
  {
    emoji: "📝",
    label: "Storytelling",
    selected: false,
    value: `Storytelling: "Captivates through engaging narratives, weaving information into compelling stories."`,
    desc: "Captivates through engaging narratives, weaving information into compelling stories.",
  },
]

export const BEHAVIORS_AGENT = {
  personality_traits: PERSONALITY_LIST,
  communication_style: COMMUNICATION_STYLE_LIST,
}

export const CLEAR_CACHED_MESSAGE = "CLEAR_CACHED"

export const AGENT_INFO_CLANS = [
  {
    username: "@maxisbuyin_",
    xLink: "https://x.com/maxisbuyin_",
    teleLink: "https://t.me/maxisbuyin",
    shareLink: "https://mesh.distilled.ai/clan/@maxisbuyin_",
    contract: "oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h",
  },
  {
    username: "@stalor",
    xLink: "https://x.com/stalor_ai",
    teleLink: "https://t.me/cupiee_official",
    shareLink: "https://mesh.distilled.ai/clan/@stalor",
    contract: "",
  },
]
