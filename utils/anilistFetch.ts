import axios from "axios";

interface GraphQLRequestBody {
  query: string;
  variables?: { [key: string]: any };
  operationName?: string;
}

interface GraphQLResponse<T> {
  data: T;
  errors?: object[];
}

export const anilistFetch = async <T>(body: GraphQLRequestBody, token = "") => {
  const response = await axios.post<GraphQLResponse<T>>(
    "https://graphql.anilist.co",
    body,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    }
  );

  return response.data;
};
