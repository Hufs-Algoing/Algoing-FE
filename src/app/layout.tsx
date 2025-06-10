import { Suspense } from "react";
import ErrorBoundary from "./_components/Error-boundary";
import { PageLoading } from "./_components/loading";
import Providers from "./providers";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {" "}
          <ErrorBoundary>
            <Suspense fallback={<PageLoading />}>{children}</Suspense>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
