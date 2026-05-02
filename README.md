🧪 CoinLab (코인랩) - 실시간 가상 코인 투자 & 분석 플랫폼
📖 프로젝트 소개
CoinLab은 실제 코인 시장의 데이터를 바탕으로 나만의 투자 전략을 실험해 볼 수 있는 고성능 모의 투자 플랫폼입니다.
초당 수십 번씩 업데이트되는 실시간 WebSocket 시세 데이터를 브라우저 렌더링 지연(Jank) 없이 부드럽게 처리하며, 트레이딩뷰 수준의 전문적인 차트 분석 환경을 제공하는 것을 목표로 합니다.

👥 팀원 및 역할 (R&R)
Frontend ([본인 이름]): React + Vite 기반의 고성능 UI/UX 구현, FSD 아키텍처 설계, 실시간 시세 데이터 상태 관리 및 렌더링 최적화.

Backend ([팀원 이름]): Spring Boot 기반 외부 거래소 API 연동, 실시간 데이터 중계를 위한 WebSocket 서버 구축, 모의 투자 체결 로직 및 DB 관리.

✨ 핵심 기능 (Key Features)
⚡ 실시간 시세 및 호가창: WebSocket을 통한 지연 없는 1초 단위 데이터 수신 및 애니메이션 시각화.

📈 고성능 캔들스틱 차트: Lightweight Charts를 활용한 대규모 과거 시계열 데이터(OHLC) 무한 스크롤 및 타임프레임(1분/5분/1시간 등) 변경.

💰 모의 투자 시스템 (Paper Trading): 가상의 자산으로 실시간 시장가 매수/매도 진행 및 실시간 수익률(%) 자동 계산.

⚙️ 사용자 맞춤 설정: 다크모드/라이트모드 지원 및 관심 종목(Watchlist) 관리.

🏗 아키텍처 (FSD - Feature-Sliced Design)
본 프로젝트는 뛰어난 유지보수성과 컴포넌트 재사용성을 위해 FSD(기능 분할 설계) 방법론을 엄격하게 적용하여 설계되었습니다.
src/
 ├── app/       # 앱 전역 설정 (라우터, 전역 스타일, 상태 프로바이더)
 ├── pages/     # 라우팅 단위의 완성된 페이지 (Dashboard, MyPage)
 ├── widgets/   # 조립된 독립적 대형 블록 (Header, MarketScanner, TradingChart)
 ├── features/  # 사용자 상호작용 로직 (매수/매도, 관심종목 추가)
 ├── entities/  # 비즈니스 데이터 모델 (Coin, Portfolio 타입 및 스토어)
 └── shared/    # 재사용 가능한 순수 조각 (Shadcn UI Button, Axios 인스턴스, 유틸 함수)
 🔥 기술적 도전 및 해결 과정 (Technical Challenges)
1. 초당 다발적인 WebSocket 데이터로 인한 리렌더링 최적화
문제: 서버에서 수시로 들어오는 실시간 틱(Tick) 데이터마다 React 상태를 업데이트할 경우, 브라우저의 메인 스레드가 과부하에 걸려 화면 멈춤 현상이 발생.

해결: Throttling 기법을 도입하여 백그라운드에서는 데이터를 실시간으로 수집하되, UI 업데이트(렌더링)는 requestAnimationFrame 또는 특정 주기(150ms)로 묶어 처리함으로써 60FPS의 부드러운 화면 전환을 유지했습니다.

2. 메인 스레드 부하 분산과 UI 병목 해결
문제: 기술적 지표(이동평균선, 볼린저 밴드 등)를 계산하는 무거운 연산이 UI 렌더링 스레드와 동일한 곳에서 실행되어 사용자 입력 지연(Input Latency) 유발.

해결: 복잡한 시계열 데이터 연산을 Web Worker로 분리하여 백그라운드 스레드에 위임. 이로 인해 차트를 줌/팬(Zoom/Pan) 하거나 호가창이 급변할 때도 입력 지연 없는 쾌적한 UX를 달성했습니다.

3. 실시간 파생 상태(Derived State)의 효율적 관리
문제: 모의 투자 포트폴리오의 '수익률'은 (고정된 매수 평단가)와 (실시간으로 변하는 현재가)가 결합되어 지속적으로 계산되어야 함.

해결: Zustand를 활용해 매수 데이터는 로컬 상태로 들고 있고, WebSocket에서 들어오는 시세 데이터를 구독하여 렌더링 단에서 실시간 수익률을 도출. 리스트의 특정 행(Row)만 독립적으로 리렌더링 되도록 React.memo를 결합하여 불필요한 DOM 조작을 최소화했습니다.

🛠 실행 방법 (Getting Started)
Prerequisites
Node.js 18.0 이상

백엔드 Spring Boot 서버 구동 (혹은 더미 데이터 모드 활성화)

Installation
Bash
# 1. 저장소 클론
$ git clone https://github.com/[깃허브_주소]/coinlab-frontend.git

# 2. 패키지 설치
$ cd coinlab-frontend
$ npm install

# 3. 개발 서버 실행
$ npm run dev
