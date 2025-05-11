import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import useShared, { LocalStorage } from "@waradu/useshared";
import type { Auth } from "~/composables/useAuth";
import type { DocumentNode } from "graphql";

interface Options {
  query: DocumentNode;
  variables?: Record<string, any>;
}

export default defineNuxtPlugin(() => {
  const { reset } = useAuth();

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (
          err.extensions?.code === "UNAUTHENTICATED" ||
          err.message === "Invalid token"
        ) {
          reset();
          return;
        }
      }
    }
    if (
      networkError &&
      // @ts-ignore
      networkError.statusCode === 400
    ) {
      reset();
    }
  });

  const httpLink = new HttpLink({
    uri: "https://graphql.anilist.co",
  });

  const apolloClient = new ApolloClient({
    link: from([errorLink, httpLink]),
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
