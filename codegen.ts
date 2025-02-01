import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema.graphql",
  documents: ["./**/*.tsx", "./**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./gql/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragment" },
      },
    },
  },
};

export default config;
