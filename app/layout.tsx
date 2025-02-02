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
