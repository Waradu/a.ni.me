import { defineNuxtPlugin } from "#app";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";

export default defineNuxtPlugin((nuxtApp) => {
  const apolloClient = new ApolloClient({
    uri: "https://graphql.anilist.co",
    cache: new InMemoryCache(),
  });

  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);

  if (import.meta.client) {
    (window as any).$apolloClient = apolloClient;
  }
});
