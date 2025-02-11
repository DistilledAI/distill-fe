import { envConfig } from "@configs/env"
import axios from "axios"

export const postDataToIPFS = async (data: any) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  const pinataApiKey = envConfig.pinataApiKey
  const pinataSecretApiKey = envConfig.pinataSecretKey

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    return response.data
  } catch (error) {
    console.error("Error uploading JSON:", error)
  }
}
