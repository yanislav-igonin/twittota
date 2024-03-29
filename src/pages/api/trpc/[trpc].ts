import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "@/env.mjs";
import { createTRPCContext } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
        const { cause } = error;
        let message = error.message;
        if (cause) {
          message = `${message} (caused by ${JSON.stringify(cause)})`;
        }
        console.error(
          `❌ tRPC failed on ${path ?? "<no-path>"}: ${message}`,
        );
      }
      : undefined,
});
