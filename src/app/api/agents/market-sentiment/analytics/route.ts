import { MarketSentiment } from "@/core/agent"
import { requestMarketSentiment } from "@/server/agent/api"

export async function GET() {
    const response = await requestMarketSentiment()
    const marketSentiment: MarketSentiment = {
        content: response.result.market.context,
    }
    return Response.json({
        data: marketSentiment,
    })
}
