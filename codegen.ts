import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema.graphql",
  documents: ["./**/*.tsx", "./**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
