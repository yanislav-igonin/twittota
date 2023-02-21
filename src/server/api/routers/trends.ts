import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const defaultKeywords = [
  'apple',
  '"$aapl"',
  'microsoft',
  '"$msft"',
  'google',
  '"$goog"',
  'netflix',
  '"$nflx"',
  'amazon',
  '"$amzn"',
  'meta',
  '"$meta"',
  'bitcoin',
  '"$btc"',
  'ethereum',
  '"$eth"',
];

export const trendsRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({
    keywords: z.array(z.string()).default(defaultKeywords),
    granularity: z.enum(['minute', 'hour', 'day']).default('hour'),
  })).query(async ({ input, ctx: { twitter } }) => {
    const { keywords, granularity } = input;
    const countsPromises = keywords
      .map((keyword) => twitter.tweets.tweetCountsRecentSearch({
        query: keyword,
        granularity: granularity,
      }));
    const counts = await Promise.all(countsPromises);
    return counts.map((count, index) => ({
      keyword: keywords[index],
      ...count,
    }));
  }),
});
