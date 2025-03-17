import { Helmet } from "react-helmet-async"

interface DynamicTitleMetaProps {
  title: string
}

const DynamicTitleMeta: React.FC<DynamicTitleMetaProps> = ({ title = "" }) => {
  if (!title) return null

  const pageTitle = `${title} | Distilled AI`

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta property="og:title" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />
    </Helmet>
  )
}

export default DynamicTitleMeta
