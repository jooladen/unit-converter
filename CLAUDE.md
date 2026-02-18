# CLAUDE.md — 단위 변환기

## 프로젝트 정보
- GitHub 저장소: `https://github.com/jooladen/unit-converter`
- 기술 스택: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- 배포: Vercel

## 기본 규칙
- 항상 한국어로 응답
- 작업 시작 시 `prd/HANDOFF.md`와 `prd/chunk_roadmap.md` 먼저 읽기
- `prd/PRD.md`는 기능 상세가 필요할 때 참고

## 작업 방식
- 미완료 Chunk만 순서대로 작업
- 한 번에 여러 Chunk 절대 금지
- `chunk_roadmap.md`에 없는 기능 임의 추가 금지
- 애매하면 질문하지 말고 최선의 판단으로 진행, `HANDOFF.md`에 기록

## 기존 프로젝트 처리
- `package.json` 있으면 프로젝트 생성 스킵, 없는 것만 추가
- 이미 있는 파일/폴더 덮어쓰지 않음

## Chunk 완료 시 필수 절차
1. `prd/HANDOFF.md` 업데이트
2. `prd/chunk_roadmap.md` 체크박스 `[x]` 체크
3. `git add . → git commit → git push` (메시지: `"Chunk N: 한 줄 요약"`)
4. "Chunk N 완료" 출력

## Git 규칙
- Chunk 완료 시에만 commit + push
- 첫 push: `git push -u origin main`
- 이후: `git push`

## 코드 규칙
- TypeScript strict 모드
- 상수 파일 사용 (매직 넘버 금지)
- 사용자 노출 텍스트 한국어
