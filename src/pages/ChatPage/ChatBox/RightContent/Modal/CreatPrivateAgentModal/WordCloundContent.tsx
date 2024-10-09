import ReactWordcloud from "react-wordcloud"

const stopwords = [
  "i",
  "me",
  "my",
  "myself",
  "we",
  "our",
  "ours",
  "ourselves",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "he",
  "him",
  "his",
  "himself",
  "she",
  "her",
  "hers",
  "herself",
  "it",
  "its",
  "itself",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  "what",
  "which",
  "who",
  "whom",
  "this",
  "that",
  "these",
  "those",
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "having",
  "do",
  "does",
  "did",
  "doing",
  "a",
  "an",
  "the",
  "and",
  "but",
  "if",
  "or",
  "because",
  "as",
  "until",
  "while",
  "of",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "to",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "should",
  "now",
  "com",
  "https",
  "//www",
  "//lnkd",
]

const options = {
  colors: [
    "#877B55",
    "#E1CC9B",
    "#AD9144",
    "#84723B",
    "#BAB4A2",
    "#BAB4A2",
    "#979282",
    "#756C42",
    "#AFA9A3",
    "#58564C",
    "#7A725A",
  ],
  enableTooltip: false,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  // rotationAngles: [-45, -45],
  rotationAngles: [0, 0],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 800,
} as any

const size = [300, 300] as any

const WordCloundContent: React.FC<{ paragraph: string }> = ({ paragraph }) => {
  const wordFrequency = (paragraph: string, stopwords: Array<string>) => {
    paragraph = paragraph.trim()
    let words = paragraph
      .split(/\s+|[.,!?;:]/)
      .filter((word) => word.length > 0)

    // Remove stopwords
    words = words.filter((word) => !stopwords.includes(word.toLowerCase()))
    let frequency = {} as any
    words.forEach((word) => {
      word = word.toLowerCase()
      frequency[word] = (frequency[word] || 0) + 1
    })

    const result = Object.keys(frequency).map((key) => ({
      text: key,
      value: frequency[key],
    }))
    return result
  }
  const frequency = wordFrequency(paragraph, stopwords)

  return <ReactWordcloud options={options} words={frequency} size={size} />
}
export default WordCloundContent