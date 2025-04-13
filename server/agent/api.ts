import * as v from 'valibot';
import { MarketSentimentResponseSchema, TokenResponseSchema } from './_internal';
import http from '@/server/integration/http';

export async function requestMarketSentiment() {
  const response = await http.get(`analytics/market-sentiment`).json();
  const validated = v.parse(MarketSentimentResponseSchema, response);
  return validated;
}

export async function requestToken(body: {
  symbol: 'BTC' | 'ETH' | 'LINK';
  period: '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '7d' | '30d';
}) {
  const response = await http.post(`analytics/token`, { json: body }).json();
  const validated = v.parse(TokenResponseSchema, response);
  return validated;
}
