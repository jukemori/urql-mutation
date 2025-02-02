import { useMemo } from "react";
import {
  createClient,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from "@urql/next";

export function useUrqlClient() {
  const [client, ssr] = useMemo(() => {
    const isClient = typeof window !== "undefined";
    const ssr = ssrExchange({ isClient });
    const client = createClient({
      url: "http://localhost:3001/graphql",
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: !isClient,
      fetchOptions: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      },
    });

    return [client, ssr];
  }, []);

  return { client, ssr };
}
