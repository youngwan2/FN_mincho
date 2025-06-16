# React 19 SEO 최적화 가이드

이 문서는 React 19 환경에서 검색 엔진 최적화(SEO)를 효과적으로 적용하는 방법을 안내합니다.

---

## 1. 메타 태그 및 문서 헤드 관리
- **react-helmet-async** 또는 **@remix-run/react**의 `<Meta />` 컴포넌트 등으로 각 페이지별 title, description, og:image 등 메타 태그를 동적으로 관리하세요.
- 예시:
  ```tsx
  import { Helmet } from 'react-helmet-async';
  <Helmet>
    <title>페이지 제목</title>
    <meta name="description" content="페이지 설명" />
    <meta property="og:title" content="공유 제목" />
    <meta property="og:description" content="공유 설명" />
    <meta property="og:image" content="/og-image.png" />
  </Helmet>
  ```

## 2. SSR(서버사이드 렌더링) 또는 SSG(정적 사이트 생성) 활용
- React 19는 CSR(클라이언트 사이드 렌더링)만으로는 SEO에 한계가 있습니다.
- **Next.js, Remix, RSC(React Server Components)** 등 SSR/SSG 프레임워크를 적극 활용하세요.
- Vite + React 환경에서는 [vite-ssr](https://github.com/frandiox/vite-ssr) 등도 참고.

## 3. 크롤러 친화적 라우팅
- react-router의 동적 라우팅도 SSR 환경에서만 SEO에 반영됩니다.
- CSR만 사용하는 경우, 검색엔진이 JS를 실행하지 않으면 라우트별 콘텐츠가 노출되지 않을 수 있습니다.

## 4. 구조화 데이터(Structured Data) 추가
- JSON-LD 스키마를 `<script type="application/ld+json">`로 삽입해 검색엔진에 의미를 명확히 전달하세요.
- 예시:
  ```tsx
  <Helmet>
    <script type="application/ld+json">{JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '민초',
      url: 'https://mincho.com',
      logo: '/logo.png',
    })}</script>
  </Helmet>
  ```

## 5. 접근성(Accessibility) 개선
- 시맨틱 태그(`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>` 등) 적극 사용
- 이미지에는 alt 속성 필수
- aria-* 속성, role 속성 등도 적극 활용

## 6. 성능 최적화
- 이미지 최적화, lazy loading, 코드 스플리팅, preload/preconnect 등 활용
- Lighthouse, PageSpeed Insights 등으로 성능 점검

## 7. robots.txt, sitemap.xml 제공
- `/public/robots.txt`, `/public/sitemap.xml` 파일을 제공해 검색엔진 크롤러가 사이트 구조를 쉽게 파악할 수 있도록 합니다.

## 8. 기타 팁
- canonical 태그로 중복 URL 방지
- 404/에러 페이지도 SEO 친화적으로 구성
- 소셜 미디어 공유(og, twitter meta) 태그 꼼꼼히 관리

---

## 참고 자료
- [React 공식 SEO 가이드](https://react.dev/learn/seo)
- [Next.js SEO](https://nextjs.org/learn/seo)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Open Graph Protocol](https://ogp.me/)

---

> 이 가이드는 React 19 및 최신 프론트엔드 환경에 맞춰 작성되었습니다. SSR/SSG 환경에서 더욱 강력한 SEO 효과를 얻을 수 있습니다.
