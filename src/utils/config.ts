export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  twitter: {
    bearerToken: process.env.TWITTER_BEARER_TOKEN ?? '',
  },
};