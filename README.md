# 독서 기록장 (with Multi-Step Form)

이 프로젝트는 사용자의 독서 활동을 구조적으로 기록하기 위한 **프론트엔드 전용 웹 애플리케이션**입니다.  
총 5단계의 Multi-Step Form으로 구성되며, 각 단계는 명확한 유효성 검증과 사용자 경험(UX)을 중심으로 설계되어 있습니다.

---

## 프로젝트 목표

- 독서 경험을 정형화된 방식으로 기록할 수 있는 사용자 인터페이스 제공
- 각 단계별 실시간 유효성 검증 및 사용자 피드백 제공
- 상태 복원 및 앱 미리보기 등 UX 기능 포함

---

## 주요 기능

- 5단계 Multi-Step Form (도서 정보 → 추천 여부 → 독후감 → 인용구 → 공개 설정)
- 입력값에 따라 동적으로 적용되는 조건부 필수 필드 검증
- 각 단계별 유효성 검사 및 UX 최적화
- 실시간 앱 화면 프리뷰 기능 (데스크탑 해상도에서만 노출)
- 입력값 변경 후 500ms debounce 기반 preview 동기화
- 상태 자동 저장 및 새로고침 이후 복원 (localStorage 기반)
- 전체 입력값을 초기화할 수 있는 Reset 기능 제공

---

## 기술 스택

- **TypeScript**
- **Next.js** (Page Router)
- **React**
- **React Hook Form**
- **React Query**
- **Emotion**
- **Jotai** (상태 공유 필요 시 사용)

---

## 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 접속
http://localhost:3000
```


---

## 비고
- 백엔드 없이 동작하는 프론트엔드 단독 SPA입니다.
- 입력값, 단계 상태 등 모든 폼 데이터는 브라우저 환경(localStorage)에서 관리됩니다.
- 미리보기 화면은 데스크탑 해상도(viewport ≥ 1024px)에서만 활성화됩니다.
