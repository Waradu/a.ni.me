import {
  ApolloClient,
  InMemoryCache,
  type DocumentNode,
} from "@apollo/client/core";

interface Options {
  query: DocumentNode;
  variables?: Record<string, any>;
}

const cache = new InMemoryCache();
const apolloClient = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache,
});

export default defineNuxtPlugin(() => {
  const apollo = {
    get: async <T>(options: Options, token = "") => {
      const { data, errors } = await apolloClient.query<T>({
        query: options.query,
        variables: options.variables,
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      if (errors) throw new Error(errors[0].message);

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
