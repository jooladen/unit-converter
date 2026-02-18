# 단위변환기

길이, 무게, 온도를 실시간으로 변환하는 웹 애플리케이션입니다.

## 기능

- **길이 변환**: mm, cm, m, km, in, ft, yd, mi
- **무게 변환**: mg, g, kg, t, oz, lb
- **온도 변환**: ℃, ℉, K
- 실시간 변환 (입력 즉시 결과 표시)
- 단위 스왑 (좌우 교체)
- 입력 검증 (숫자만 허용, 음수 제한)
- 반응형 레이아웃 (모바일/데스크탑)

## 기술 스택

- [Next.js](https://nextjs.org/) 16 (App Router)
- TypeScript
- Tailwind CSS

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 배포

[Vercel](https://vercel.com)에 GitHub 저장소를 연동하면 자동으로 배포됩니다.
