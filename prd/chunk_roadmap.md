# 단위 변환기 — Chunk 로드맵

---

## Chunk 0: 사람이 직접 할 것 ⚠️

> Claude Code가 아니라 **사람이 직접** 합니다.

### 할 일
- [ ] **Vercel 계정** — [vercel.com](https://vercel.com) 가입 (GitHub 연동)
- [ ] **GitHub 저장소 생성** — 빈 저장소 (README 없이)
- [ ] **CLAUDE.md에 GitHub URL 채워넣기** — `여기에_GitHub_저장소_URL_입력` 부분을 실제 URL로 교체
- [ ] **프로젝트 폴더에 문서 파일 배치**
  - 루트에 `CLAUDE.md`
  - `/prd` 폴더에 `PRD.md`, `chunk_roadmap.md`, `HANDOFF.md`

### 완료조건
- [ ] GitHub 빈 저장소 존재
- [ ] CLAUDE.md에 실제 GitHub URL 들어가 있음
- [ ] 프로젝트 폴더 구조:
  ```
  /
  ├── CLAUDE.md
  └── prd/
      ├── PRD.md
      ├── chunk_roadmap.md
      └── HANDOFF.md
  ```

---

## Chunk 1: 프로젝트 초기 세팅

### 목표
Next.js 프로젝트 생성 + 기본 구조 잡기

### 선행조건
- Chunk 0 완료 (GitHub 저장소, 문서 파일 배치)

### 상세 작업
- [x] Next.js 16 프로젝트 생성 (App Router, TypeScript, Tailwind CSS, ESLint)
  - `package.json` 이미 있으면 생성 스킵, 없는 패키지만 추가
- [x] 불필요한 보일러플레이트 정리 (기본 페이지 내용 제거)
- [x] 폴더 구조 생성:
  ```
  src/
  ├── app/
  │   ├── layout.tsx
  │   ├── page.tsx
  │   └── globals.css
  ├── components/        ← UI 컴포넌트
  ├── constants/         ← 단위 정의, 변환 비율 등
  └── utils/             ← 변환 로직 함수
  ```
- [x] `src/constants/units.ts` 생성
  - 길이, 무게, 온도 단위 정의 (PRD 4장 참고)
  - 각 단위의 표시명, 비율값
  - 카테고리별 기본 선택 단위 정의
- [x] `src/utils/convert.ts` 생성
  - 길이 변환 함수 (기준 단위 m 경유)
  - 무게 변환 함수 (기준 단위 g 경유)
  - 온도 변환 함수 (6가지 공식, PRD 4.3 참고)
  - 소수점 처리: 4자리, 뒤쪽 0 제거
- [x] `src/app/layout.tsx` — 기본 레이아웃 (HTML lang="ko", 메타 타이틀 "단위변환기")
- [x] `src/app/page.tsx` — 빈 페이지 껍데기 ("단위변환기" 제목만)

### 완료조건
- [x] `npm run dev` 정상 실행
- [x] 브라우저에서 "단위변환기" 제목 보임
- [x] `convert.ts`에서 변환 함수가 정상 동작 (예: convert(1, 'm', 'cm', 'length') === 100)
- [x] 상수 파일에 모든 단위 정의 완료

---

## Chunk 2: 탭 UI + 변환 화면 구현

### 목표
탭 전환과 실시간 변환이 동작하는 완전한 UI

### 선행조건
- Chunk 1 완료 (상수, 변환 함수, 기본 레이아웃)

### 상세 작업
- [x] `src/components/Tabs.tsx` — 탭 컴포넌트
  - 길이 / 무게 / 온도 3개 탭
  - 현재 선택 탭 시각적 강조 (포인트 컬러)
  - 탭 전환 시 콜백
- [x] `src/components/Converter.tsx` — 변환 영역 컴포넌트
  - 왼쪽: 숫자 입력 필드 + 단위 드롭다운
  - 가운데: ⇄ 스왑 버튼
  - 오른쪽: 결과 표시 (읽기 전용) + 단위 드롭다운
  - 입력 검증 (PRD 6장):
    - 숫자 + 소수점만 허용
    - 길이/무게: 음수 불허
    - 온도(℃, ℉): 음수 허용
    - 소수점 하나만
    - 붙여넣기 필터링
  - 실시간 변환: 입력 onChange마다 즉시 계산
  - 스왑: 좌우 단위 교체 + 재계산
  - 탭 전환 시 초기화 (빈 입력, 기본 단위)
- [x] `src/components/UnitSelect.tsx` — 단위 드롭다운 컴포넌트
  - 네이티브 select 사용
  - 카테고리에 맞는 단위 목록 표시
- [x] `src/app/page.tsx` 업데이트 — 탭 + Converter 조합
- [x] 에러 처리 (PRD 8장):
  - 같은 단위 → 입력값 그대로
  - 켈빈 음수 → "0" + 안내 문구 "절대영도(0K) 이하입니다"
  - 빈 입력 → "0"
  - 범위 초과 → "범위 초과" 표시
- [x] 반응형 레이아웃 (PRD 9장):
  - 모바일 (< 640px): 상하 배치 (입력 → 스왑 → 결과)
  - 데스크탑 (≥ 640px): 좌우 배치, 가운데 정렬, max-w-xl
- [x] globals.css 스타일 정리
  - 라이트 모드 전용
  - 포인트 컬러 (블루 계열)

### 완료조건
- [x] 3개 탭 전환 정상 동작
- [x] 숫자 입력 시 실시간 변환 표시
- [x] 스왑 버튼 동작 확인
- [x] 음수 입력 검증 (길이/무게 불가, 온도 가능)
- [x] 켈빈 음수 안내 표시
- [x] 모바일/데스크탑 레이아웃 전환 확인
- [x] 문자 입력 시 필터링 동작

---

## Chunk 3: 마무리

### 목표
SEO, 접근성, 전체 점검 + 배포 준비

### 선행조건
- Chunk 2 완료 (전체 UI 동작)

### 상세 작업
- [ ] SEO 메타 태그 설정 (`src/app/layout.tsx`)
  - title: "단위변환기 — 길이, 무게, 온도 실시간 변환"
  - description: "길이, 무게, 온도를 실시간으로 변환하세요. mm, cm, m, km, kg, lb, ℃, ℉ 등 다양한 단위를 지원합니다."
  - Open Graph 태그
  - viewport 설정
- [ ] 접근성 점검
  - input에 적절한 label/aria-label
  - 탭에 role="tablist" / role="tab"
  - 키보드 탐색 가능 확인
- [ ] 에러 UI 전체 점검
  - 모든 에러 시나리오 재확인 (PRD 8장)
- [ ] favicon 설정 (Next.js 기본 또는 심플한 아이콘)
- [ ] README.md 작성
  - 프로젝트 소개
  - 기술 스택
  - 로컬 실행 방법 (`npm install` → `npm run dev`)
  - 배포 방법 (Vercel 연동)
- [ ] 전체 빌드 테스트 (`npm run build` 에러 없이 통과)

### 완료조건
- [ ] `npm run build` 성공
- [ ] SEO 메타 태그 확인 (페이지 소스에서)
- [ ] 접근성 기본 요소 확인
- [ ] README.md 존재 + 내용 충실
- [ ] Vercel 배포 준비 완료 (빌드 통과 상태)
