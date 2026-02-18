import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "단위변환기 — 길이, 무게, 온도 실시간 변환",
  description:
    "길이, 무게, 온도를 실시간으로 변환하세요. mm, cm, m, km, kg, lb, ℃, ℉ 등 다양한 단위를 지원합니다.",
  openGraph: {
    title: "단위변환기 — 길이, 무게, 온도 실시간 변환",
    description:
      "길이, 무게, 온도를 실시간으로 변환하세요. mm, cm, m, km, kg, lb, ℃, ℉ 등 다양한 단위를 지원합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
