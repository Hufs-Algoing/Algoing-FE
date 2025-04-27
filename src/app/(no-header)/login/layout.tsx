export const metadata = {
  title: "로그인 | ALGOING",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children} {/* 헤더 없이 로그인 UI만 */}
    </div>
  );
}
