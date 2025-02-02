## GraphQL setup

```bash
npm install @urql/next urql graphql
npm install -D @graphql-codegen/cli @graphql-codegen/client-preset
```

### GraphQL codegen

Create a schema.graphql file in your project root. This file will contain your GraphQL schema. Reference example:

```graphql
type User {
  id: ID!
  username: String
  email: String
}

type Query {
  users: [User!]!
  user(id: ID!): User!
}

type Mutation {
  createUser(
    username: String!
    email: String!
    password: String!
  ): CreateUserResponse!
  login(email: String!, password: String!): LoginResponse!
}
```

### Create CodeGen Configuration

Create a codegen.yml file in your project root:

```yml
schema: schema.graphql
documents: ["app/**/*.tsx", "gql/**/*.ts"]
generates:
  gql/:
    preset: client
    config:
      useTypeImports: true
```

### Add CodeGen Scripts

Add these scripts to your package.json:

```json
{
  "scripts": {
    "codegen": "graphql-codegen --config codegen.yml",
    "codegen:watch": "graphql-codegen --config codegen.yml -w"
  }
}
```

## Set Up URQL Client

### Create URQL Client Configuration

Create a file lib/urql.ts to configure the URQL client:

```tsx
import { useMemo } from "react";
import {
  createClient,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from "@urql/next";

export function useUrqlClient() {
  const [client, ssr] = useMemo(() => {
    const isClient = typeof window !== "undefined";
    const ssr = ssrExchange({ isClient });
    const client = createClient({
      url: "http://localhost:3001/graphql",
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: !isClient,
      fetchOptions: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      },
    });

    return [client, ssr];
  }, []);

  return { client, ssr };
}
```

### Set Up URQL Provider

Wrap your application with the URQL provider in your root layout:

```tsx
"use client";

import { UrqlProvider } from "@urql/next";
import { useUrqlClient } from "@/lib/urql";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { client, ssr } = useUrqlClient();

  return (
    <html lang="en">
      <body>
        <UrqlProvider client={client} ssr={ssr}>
          {children}
        </UrqlProvider>
      </body>
    </html>
  );
}
```

### Using GraphQL Queries

Here's an example of how to use a GraphQL query in your components:

```tsx
"use client";

import { graphql } from "@/gql/";
import { useQuery } from "@urql/next";

const query = graphql(/* GraphQL */ `
  query Users {
    users {
      id
      username
      email
    }
  }
`);

export default function Home() {
  const [{ data, fetching, error }, execute] = useQuery({
    query,
  });

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.users.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

### Running CodeGen

Run the initial code generation:

```bash
npm run codegen
```

Or use watch mode during development:

```bash
npm run codegen:watch
```

This will generate typed GraphQL operations in the gql/ directory.

### Generated Files Structure

The CodeGen will generate several files:

- gql/graphql.ts: Contains TypeScript types for your GraphQL schema
- gql/gql.ts: Contains the GraphQL operation helpers
- gql/fragment-masking.ts: Contains utilities for GraphQL fragments

Key Features of This Setup

- Type Safety: Full TypeScript support for GraphQL operations
- SSR Support: Built-in Server-Side Rendering support with @urql/next
- Auto-generated Types: Automatic type generation from your GraphQL schema
- Development Workflow: Watch mode for continuous type generation
- Cache Management: Built-in caching with URQL's cache exchange

Best Practices

- Always run npm run codegen after modifying GraphQL queries or schema
- Keep your GraphQL schema up to date
- Use the generated types for type safety
- Utilize URQL's built-in caching capabilities
- Handle loading and error states in your components

This setup provides a robust foundation for working with GraphQL in a Next.js application, with full type safety and optimal development experience.
