import { UrqlProvider } from "@urql/next";
import { getClient, ssr } from "@/lib/urql";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UrqlProvider client={getClient()} ssr={ssr}>
          {children}
        </UrqlProvider>
      </body>
    </html>
  );
}
