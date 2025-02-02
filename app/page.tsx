"use client";

import { graphql } from "@/gql/";
import { useQuery } from "@urql/next";

const query = graphql(/* GraphQL */ `
  query Users {
    users {
      id
      username
      email
      favorites {
        id
        player {
          id
          name
        }
      }
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
        <div key={user.id} className="mb-6 p-4 border rounded">
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Favorite Players:</h3>
            {user.favorites?.length ? (
              <ul className="list-disc pl-5">
                {user.favorites.map((favorite) => (
                  <li key={favorite?.id}>{favorite?.player.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No favorite players</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
