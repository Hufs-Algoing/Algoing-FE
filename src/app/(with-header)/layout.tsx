import { Suspense } from "react";
import Header from "../_components/Header";
import { PageLoading } from "../_components/loading";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <link rel="preload" href="/app/global.css" as="style" />
      <main className="pt-[72px]">
        <Suspense fallback={<PageLoading />}>{children}</Suspense>
      </main>
    </>
  );
}
