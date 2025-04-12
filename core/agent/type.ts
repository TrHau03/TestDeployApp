import * as v from 'valibot';
import { AgentResponseSchema, MarketSentimentResponseSchema } from './schema';
import { TokenResponseSchema } from '@/server/agent/_internal';

export type Agent = v.InferOutput<typeof AgentResponseSchema>;

export type MarketSentiment = v.InferOutput<typeof MarketSentimentResponseSchema>;
export type Token = v.InferOutput<typeof TokenResponseSchema>;
