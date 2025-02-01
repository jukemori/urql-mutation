import {
  createClient,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from "@urql/core";
import { registerUrql } from "@urql/next/rsc";

export const ssr = ssrExchange();

const makeClient = () => {
  return createClient({
    url: "http://localhost:3000/graphql",
    exchanges: [cacheExchange, ssr, fetchExchange],
    fetchOptions: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

export const { getClient } = registerUrql(makeClient);
