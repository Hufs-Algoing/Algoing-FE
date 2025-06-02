import "./globals.css";
import Providers from "./providers";

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
      <body className="min-h-screen bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
