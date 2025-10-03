import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client/core";
import { ErrorLink } from "@apollo/client/link/error";
import type { DocumentNode } from "graphql";

interface Options {
  query: DocumentNode;
  variables?: Record<string, string | number | object>;
}

export default defineNuxtPlugin(() => {
  const auth = useAuthStore();

  const errorLink = new ErrorLink(({ error }) => {
    if ("errors" in error && Array.isArray(error.errors)) {
      for (const err of error.errors) {
        if (
          err.extensions?.code === "UNAUTHENTICATED" ||
          err.message === "Invalid token"
        ) {
          auth.reset();
          return;
        }
      }
    }

    if ((error as unknown as { statusCode: number; }).statusCode === 401) {
      auth.reset();
    }
  });

  const httpLink = new HttpLink({
    uri: "https://graphql.anilist.co",
  });

  const apolloClient = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        errorPolicy: "all",
      },
      query: {
        errorPolicy: "all",
      },
    },
  });

  const apollo = {
    get: async <T>(options: Options, token = "") => {
      const { data } = await apolloClient.query<T>({
        query: options.query,
        variables: options.variables,
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        },
      });

      return data;
    },
    client: apolloClient,
  };

  return {
    provide: {
      apollo,
    },
  };
});
