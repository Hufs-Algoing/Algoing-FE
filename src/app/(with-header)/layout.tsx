"use client";

import Header from "../_components/Header";

export default function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <link rel="preload" href="@/app/global.css" as="style" />
      <main className="pt-[72px]">{children}</main>
    </>
  );
}
