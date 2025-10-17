import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./app/gql/gen/schema.gql",
  documents: ["app/**/*.{graphql,gql}"],
  ignoreNoDocuments: true,
  generates: {
    "./app/gql/gen/types.generated.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
        },
        defaultScalarType: "unknown",
        useTypeImports: true,
        nonOptionalTypename: true,
        skipTypeNameForRoot: true,
      },
    },
  },
};

export default config;
