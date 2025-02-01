import { graphql } from "./generated/gql";

export const UserFragment = graphql(`
  fragment UserFields on User {
    id
    username
    email
  }
`);

export const PlayerFragment = graphql(`
  fragment PlayerFields on Player {
    id
    name
  }
`);
