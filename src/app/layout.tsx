import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "단위변환기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
