import * as v from 'valibot';

export const AgentResponseSchema = v.object({
  id: v.string(),
  slug: v.string(),
  name: v.string(),
  description: v.string(),
  avatarURL: v.string(),
  type: v.union([v.literal('market-sentiment'), v.literal('coin')]),
});

export const MarketSentimentResponseSchema = v.object({
  content: v.string(),
});
