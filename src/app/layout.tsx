import { ReactNode } from "react";
import "./globals.css";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
export const metadata = {
  title: "ALGOING",
  description: "개발자들을 위한 AI 코드리뷰 서비스",
  icons: {
    icon: "/Ologo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
