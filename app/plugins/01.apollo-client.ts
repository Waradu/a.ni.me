import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from "@apollo/client/core";
import { ErrorLink } from "@apollo/client/link/error";
import { CombinedGraphQLErrors, CombinedProtocolErrors } from "@apollo/client/errors";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();

  const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
      for (const err of error.errors) {
        const code = (err.extensions as Record<string, unknown> | undefined)?.code;
        if (code === "UNAUTHENTICATED" || err.message === "Invalid token") {
          authStore.reset();
          return;
        }
      }
      return;
    }
    if (CombinedProtocolErrors.is(error)) {
      const is401 = error.errors.some(e => {
        const http = (e.extensions as Record<string, unknown> | undefined)?.http as { status?: number; } | undefined;
        return http?.status === 401;
      });
      if (is401) {
        authStore.reset();
      }
      return;
    }
    const asAny = error as unknown as { statusCode?: number; status?: number; response?: { status?: number; }; };
    const status = asAny.statusCode ?? asAny.status ?? asAny.response?.status;
    if (status === 401) {
      authStore.reset();
    }
  });

  const httpLink = new HttpLink({
    uri: "https://graphql.anilist.co"
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: authStore.token ? `Bearer ${authStore.token}` : undefined
      }
    }));
    return forward(operation);
  });

  const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    ssrMode: import.meta.server,
    defaultOptions: {
      query: { errorPolicy: "all" },
      watchQuery: { errorPolicy: "all" },
      mutate: { errorPolicy: "all" }
    }
  });

  const apollo = {
    client,
    query: async <TData, TVars extends Record<string, unknown> | undefined>(
      document: TypedDocumentNode<TData, TVars>,
      variables?: TVars
    ) => {
      const { data } = await client.query({ query: document, variables });
      return data;
    },
    mutate: async <TData, TVars extends Record<string, unknown> | undefined>(
      document: TypedDocumentNode<TData, TVars>,
      variables?: TVars
    ) => {
      const { data } = await client.mutate({ mutation: document, variables });
      return data;
    },
    watch: <TData, TVars extends Record<string, unknown> | undefined>(
      document: TypedDocumentNode<TData, TVars>,
      variables?: TVars
    ) => client.watchQuery({ query: document, variables })
  };

  return {
    provide: {
      apollo
    }
  };
});
