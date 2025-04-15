import * as v from 'valibot';
import { MetadataResponseSchema } from '../../_internal';

export const MarketSentimentResponseSchema = v.object({
  _metadata: MetadataResponseSchema,
  result: v.object({
    market: v.object({
      context: v.string(),
    }),
  }),
});

export const TokenResponseSchema = v.object({
  _metadata: MetadataResponseSchema,
  result: v.object({
    report: v.object({
      id: v.number(),
      type: v.string(),
      context: v.string(),
      created_at: v.string(),
      expired_at: v.string(),
      token: v.object({
        symbol: v.string(),
        name: v.string(),
        address: v.string(),
      }),
    }),
  }),
});
