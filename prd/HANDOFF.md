# 단위 변환기 — HANDOFF

## 마지막 완료
Chunk 3

## 현재 상태
전체 완료. SEO 메타 태그, 접근성(키보드 탐색, ARIA), README.md 작성, 빌드 테스트 통과. Vercel 배포 준비 완료.

## 주의사항
- Chunk 0은 사람이 직접
- 시스템 폰트 사용 (Geist 폰트 제거)
- 라이트 모드 전용 (다크 모드 CSS 제거)
- page.tsx는 "use client" (상태 관리 필요)
- Converter에 key={category}로 탭 전환 시 상태 초기화
- viewport는 Next.js 16 방식 (export const viewport)으로 별도 export

## 다음 작업
없음 (모든 Chunk 완료)

## 히스토리
| 시점 | 내용 |
|------|------|
| 프로젝트 생성 | HANDOFF 초기화 |
| Chunk 1 | 프로젝트 초기 세팅 — layout(lang=ko), page(제목만), units.ts(길이/무게/온도), convert.ts(변환 함수) |
| Chunk 2 | 탭 UI + 변환 화면 — Tabs.tsx, UnitSelect.tsx, Converter.tsx, page.tsx 업데이트, 입력 검증, 스왑, 실시간 변환, 반응형 레이아웃, 에러 처리 |
| Chunk 3 | 마무리 — SEO 메타 태그(title, description, OG, viewport), 접근성(탭 키보드 탐색, tabpanel, aria-label), README.md, 빌드 테스트 통과 |
