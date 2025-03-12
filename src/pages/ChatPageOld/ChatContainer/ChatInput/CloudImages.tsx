import { cloud1Img, cloud2Img, cloud3Img } from "@assets/images"
import React from "react"

const CloudImages = React.memo(() => (
  <>
    <img
      src={cloud1Img}
      className="absolute -top-[1px] left-[84px] h-8 object-cover md:-left-3 md:-top-3 md:w-[259px]"
    />
    <img
      src={cloud2Img}
      className="absolute right-9 top-[9px] h-2 object-cover md:-top-1 md:right-20 md:h-[17px] md:w-[180px]"
    />
    <img
      src={cloud3Img}
      className="absolute bottom-4 left-1/2 h-2 -translate-x-1/2 object-cover md:-bottom-[1px] md:h-4 md:w-[320px]"
    />
  </>
))

export default CloudImages
