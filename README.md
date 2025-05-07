
백엔드 README.md : https://github.com/youngwan2/BE_mincho

# 🌿 민초 커뮤니티
![image](https://github.com/user-attachments/assets/76110f28-2ca9-4908-b351-8f9b9fced9b2)

<br><br>    

## 📌 프로젝트 개요
- 민간 약초에 대한 정보를 공유하고, 사용자 증상을 기반으로 알맞은 약초를 추천하는 서비스를 중심으로 사용자들이 직접 약초 관련 경험을 나눌 수 있는 커뮤니티 웹사이트이다.
<br><br>    

## 🎯 프로젝트 목적과 방향성
**[목적]**  
민간 약초에 대한 정보를 보다 체계적으로 정리하고, 사용자들이 신뢰할 수 있는 정보를 주고받을 수 있는 공간을 제공하는 것이 목표이다. 기존 약초 관련 커뮤니티들은 정보가 파편화되어 있거나 신뢰성이 낮은 경우가 많아 이를 보완하고자 한다.
<br><br>    

## 📅 개발 기간/유지보수
- **개발 기간:** 2025년 3월 13일 ~ (진행중)
- **유지보수:** 정식 출시 후 지속적인 업데이트 예정
 <br><br>

## 🔥 배포
- 배포 작업 중
- **배포 과정:** [Notion](https://youngwan2.notion.site/1e568acd779b80ef9cb7f760bc8f6e60)

## ⚙ 구현된 기능
- **회원가입 및 로그인 (JWT 인증)**
  - `accessToken`과 `refreshToken`을 활용한 토큰 탈취를 고려한 인증 구현
  - refresh 토큰은 데이터베이스에 저장하고, 데이터베이스에 존재하지 않는 refresh 토큰이라면 인증이 거부되도록 구현
  - 만료 시 백엔드에서 설정한 jwt filter 로 부터 401 에러를 반환하고, 프론트의 axios 인터셉터에서 응답을 받은 후 refresh 토큰을 사용하여 access 토큰을 자동 재발급토록 구현
  - 일반적인 로컬 로그인뿐만 아니라 구글 소셜로그인의 경우에도 백엔드에서 모든 oauth2 인증을 진행하고, 인증 성공 시 access 와 refresh 토큰을 발급하게 하여 동일하게 처리하도록 구현

- **RAG 기반 AI 사용자 증상별 약초 추천 기능**
  - 사용자가 입력한 증상이나 관심사를 바탕으로 적절한 약초 추천
    - 개화기, 증상, 사용부위 등의 정보가 임베딩 처리되어, 증상 기반뿐만 아니라 사용자의 다른 관심사를 기반으로도 약초를 추천받을 수 있도록 처리 됨.
  - PostgreSQL의 PGVector를 통해 코사인 유사도 검색을 수행하고, RAG 기반으로 DB에 저장된 신뢰성 있는 약초 정보를 기반으로 정확한 정보를 사용자에게 제공토록 구현
    ![image](https://github.com/user-attachments/assets/1b41c9d1-ed7f-4c5d-8248-2b330aab3db1)
  - 백엔드 단에서 프롬프트 처리를 고도화하여 사용자의 증상에 가장 적합한 약초부터 우선순위를 부여하여 추천하도록 구현
    ![image](https://github.com/user-attachments/assets/01f59936-a80a-4160-b9f7-5f1062f74fc6)

- **SSE 기반 알림 기능**
  - 댓글 알림, 공지사항 알림이 존재하면 해당 알림을 실시간으로 확인할 수 있도록 구현.
    - 다만 현재 방식은 사용자가 오프라인인 경우에는 확인받을 수 없다는 제한점이 있어서 향후 PWA 적용과 FCM을 적용하여 모바일 상에서도 알림을 받을 수 있도록 개선할 예정
  - 알림 내역 관리를 위해 별도 알림 UI 추가(리액트 쿼리의 뮤테이션을 적용하여 변경사항 즉시 반영)
    - 별도로 사용자 경험 고려하여 useInfinitiQuery 기반의 무한 스크롤 적용
    ![image](https://github.com/user-attachments/assets/58331e6a-ba91-4d20-be74-c4ab8ee4561a)

- **(예정중) 사용자 클러스터링 기반 추천 기능**

- **약초 정보 검색 및 조회**
  - 일반적인 약초 정보 검색 및 조회 기능이 구현
  - 상세 페이지에서 약초의 효능, 사용법, 주의사항 등을 확인할 수 있다.

- **사용자 커뮤니티**
  - 약초 관련 경험, 질문, 노하우 등을 공유할 수 있는 커뮤니티이다. 

- **북마크 기능**
  - 관심 있는 약초를 북마크하여 쉽게 관리할 수 있다.

<br><br>    

## 🧰 기술 스택
| 구분 | 기술 스택 | 비고 |
|--------------|--------------|--------------|
| **Frontend** | `React 19` | 19버전부터 forwardRef 불필요 |
|              | `TypeScript` | 정적 타입 |
|              | `Zustand` | 클라이언트 전역 상태 |
|              | `React Query` | 비동기 서버 상태 관리, 캐싱 및 자동 리페치 처리 |
|              | `Tailwind CSS` | 유틸리티 기반 CSS 프레임워크 |
| **Backend**  | `Spring Boot` | 자바기반 백엔드 프레임워크 |
|              | `Spring Security` | 인증, 인가 및 보안 필터 프레임워크 |
|              | `Spring AI` | OpenAI 기반 LLM과의 통합 및 AI 기능 개발 |
|              | `OpenAI Embedding` | 사용자 입력 임베딩을 통한 유사도 검색 기반 추천 기능 |
|              | `JPA`, `QueryDSL` | 객체-관계 매핑 및 타입 안전한 동적 쿼리 작성 |
|              | `PostgreSQL (PGVector)` | 벡터 데이터 저장 및 유사도 기반 질의 처리 |
| **ETC**      | `Vite` | 빠른 번들링 및 개발 환경 제공 |
|              | `AWS` | 배포, S3 스토리지, RDS 등 클라우드 인프라 운영 |
|              | `GitHub Actions` | CI/CD 자동화로 빌드, 테스트, 배포 효율화 |


## 🗂️ 프로젝트 구조
```
📦 src/
 ┣ 📂apis               # Axios 기반 API 호출 함수 모음
 ┣ 📂assets             # 정적 파일(이미지, 폰트, 스타일)
 ┃ ┣ 📂fonts
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜fonts.css
 ┃ ┣ 📜home-map.png
 ┃ ┣ 📜plant.png
 ┃ ┗ 📜wave.svg
 ┣ 📂components         # 공통 UI 컴포넌트 (재사용성 높은 요소들)
 ┃ ┣ 📂button           # 버튼 UI 모음
 ┃ ┣ 📂card             # 메시지/결과 카드
 ┃ ┣ 📂carousel         # 이미지 슬라이더
 ┃ ┣ 📂editor           # 커뮤니티 글 작성 등 에디터
 ┃ ┣ 📂icon             # 아이콘 컴포넌트 (ex. Logo)
 ┃ ┣ 📂layout           # 레이아웃 관련 구성 요소
 ┃ ┣ 📂pagination       # 페이지네이션 컴포넌트
 ┃ ┗ 📂spinner          # 로딩 스피너
 ┣ 📂config             # API 설정, 상수값, 엔드포인트
 ┃ ┣ 📜api.ts
 ┃ ┣ 📜axios.ts
 ┃ ┣ 📜categories.ts
 ┃ ┣ 📜constants.ts
 ┃ ┣ 📜keys.ts
 ┃ ┗ 📜urls.ts
 ┣ 📂hooks              # 커스텀 훅
 ┃ ┣ 📂mutations        # POST, PUT, DELETE 관련 훅
 ┃ ┣ 📂queries          # GET 관련 훅
 ┃ ┣ 📜useAuth.ts       # 인증 관련 훅
 ┃ ┣ 📜usePathType.ts   # 경로 기반 조건 분기
 ┃ ┣ 📜useRedirection.tsx
 ┃ ┗ 📜useRegisterForm.ts
 ┣ 📂pages              # 라우팅 되는 페이지 UI 구성
 ┃ ┣ 📂Home             # 홈 페이지
 ┃ ┣ 📂Herb             # 약초 리스트
 ┃ ┣ 📂HerbDetail       # 약초 상세 페이지
 ┃ ┣ 📂HerbRecommend    # 추천 결과 페이지
 ┃ ┣ 📂Community        # 커뮤니티 목록
 ┃ ┣ 📂CommunityDetail  # 게시글 상세 + 댓글
 ┃ ┣ 📂CommunityEditor  # 글쓰기 페이지
 ┃ ┣ 📂Login            # 로그인
 ┃ ┣ 📂Register         # 회원가입
 ┃ ┣ 📂FindPassword     # 비밀번호 찾기
 ┃ ┗ 📂Mypage           # 마이페이지
 ┣ 📂service            # API 서비스 레이어 (비즈니스 로직)
 ┣ 📂store              # 전역 상태 관리 (ex. 로그인 상태)
 ┃ ┣ 📂types
 ┃ ┗ 📜loginState.ts
 ┣ 📂types              # 전역 타입 정의 (TS 인터페이스/타입)
 ┣ 📂utils              # 공통 유틸 함수 모음
 ┣ 📜App.tsx            # 라우팅/공통 레이아웃 설정
 ┣ 📜index.css          # 전역 CSS
 ┣ 📜main.tsx           # 진입점
 ┗ 📜vite-env.d.ts      # Vite용 타입 정의

```
