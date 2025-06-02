import "./globals.css";
import ReactQueryProvider from "./providers/react-query-provider";

export const metadata = {
  title: "ALGOING",
  description: "개발자들을 위한 AI 코드리뷰 서비스",
  icons: {
    icon: "/Ologo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
