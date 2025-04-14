import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "ALGOING",
  icons: {
    icon: "/Ologo.png",
  },
  description: "개발자들을 위한 AI 코드리뷰 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
