# 데이터베이스 스키마 설계 (Database Schema)

TripDiary 프로젝트의 핵심 데이터 구조입니다. 사용자 정보, 여행 계획, 투어 API 장소 데이터 및 여행 일기 간의 관계를 정의합니다.

---

## 1. 개요
- **Database**: H2 Database (추후 MySQL 8.0 호환 가능)
- **ORM**: Spring Data JPA
- **Design Intent**: 
  - 사진 데이터(일기 메인 이미지, 유저 프로필 이미지)는 Base64 인코딩 스트링을 온전히 저장할 수 있도록 TEXT 및 LONGTEXT 타입으로 지정합니다.
  - 일기 데이터 내부에 조회수, 좋아요, 댓글 통계 정보를 임베디드 주머니(Stats) 구조로 통합하여 관리합니다.
  - 한국관광공사 TourAPI의 공공데이터 규격과 커스텀 장소 생성을 모두 수용할 수 있도록 Trip 테이블을 설계합니다.

---

## 2. 테이블 상세 구조

### Member (사용자)
사용자 계정 정보, 프로필 이미지 및 필수 약관 동의 내역을 관리하는 테이블입니다.

| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK, Auto Increment | 고유 식별자 |
| user_id | String | - | 로그인용 사용자 아이디 |
| password | String | - | 암호화된 비밀번호 |
| nickname | String | - | 서비스 내 활동명 |
| gender | String | - | 성별 |
| birth | String | - | 생년월일 |
| profile_img | LONGTEXT | @Lob | Base64 인코딩 프로필 이미지 데이터 |
| service | Boolean | Agreements 임베디드 | 서비스 이용약관 동의 여부 |
| privacy | Boolean | Agreements 임베디드 | 개인정보 처리방침 동의 여부 |
| agreed_at | DateTime | Agreements 임베디드 | 약관 동의 일시 |

### TravelPlan (여행 계획)
사용자가 수립한 여행 일정과 지역 정보를 관리하는 테이블입니다.

| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK, Auto Increment | 고유 식별자 |
| title | String | - | 여행 계획 제목 |
| start_date | DateTime | - | 여행 시작 일시 |
| end_date | DateTime | - | 여행 종료 일시 |
| area_code | String | - | 지역 코드 |

### Journal (여행 일기)
사용자가 작성한 한 줄 일기와 디지털 엽서 정보가 저장되는 핵심 테이블입니다.

| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK, Auto Increment | 고유 식별자 |
| member_id | Long | FK (Member.id) | 작성자 식별자 |
| travel_plan_id | Long | FK (TravelPlan.id) | 연결된 여행 계획 식별자 |
| content_id | String | - | TourAPI 콘텐츠 ID |
| log_title | String | - | 여행 일기 제목 |
| location | String | - | 시도 + 시군구 결합 주소 정보 |
| place_name | String | - | 장소 명칭 |
| travel_date | DateTime | - | 실제 여행 일자 및 시간 |
| weather | String | - | 여행 당시 날씨 |
| main_image | TEXT | - | Base64 인코딩 엽서 이미지 데이터 |
| description | TEXT | - | 여행 상세 내용 및 기록 |
| likes | Integer | Stats 임베디드 | 좋아요 수 |
| comments | Integer | Stats 임베디드 | 댓글 수 |
| views | Integer | Stats 임베디드 | 조회수 |

### Comment (댓글)
여행 일기에 소통을 위해 남기는 독립형 댓글 테이블입니다.

| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK, Auto Increment | 고유 식별자 |
| journal_id | Long | FK (Journal.id) | 대상 일기 식별자 |
| member_id | Long | FK (Member.id) | 댓글 작성자 식별자 |
| text | String | - | 댓글 내용 |
| date | DateTime | - | 작성 시간 |

### Trip (관광지 / 명소 정보)
TourAPI 정보의 캐싱 및 사용자가 직접 만든 커스텀 장소를 저장하는 테이블입니다.

| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK, Auto Increment | 고유 식별자 |
| member_id | Long | FK (Member.id) | 커스텀 장소인 경우 작성자 식별자 |
| title | String | - | 장소 명칭 |
| contentid | String | - | TourAPI 고유 콘텐츠 ID |
| addr1 | String | - | 대표 주소 |
| addr2 | String | - | 상세 주소 |
| areacode | String | - | 지역 코드 |
| sigungucode | String | - | 시군구 코드 |
| cat1 / cat2 / cat3 | String | - | 대/중/소 분류 코드 |
| contenttypeid | String | - | 관광 타입 ID |
| createdtime | String | - | API 데이터 생성 시간 |
| modifiedtime | String | - | API 데이터 수정 시간 |
| firstimage | String(500) | - | 대표 이미지 URL 1 |
| firstimage2 | String(500) | - | 대표 이미지 URL 2 |
| homepage | String | - | 홈페이지 주소 |
| tel / telname | String | - | 전화번호 및 담당 명칭 |
| zipcode | String | - | 우편번호 |
| mapx / mapy | String | - | GPS 좌표 (경도 X / 위도 Y) |
| mlevel | String | - | 지도 확대 레벨 |
| overview | TEXT | - | 장소 개요 및 설명 |
| cpyrht_div_cd | String | - | 저작권 유형 코드 |
| l_dong_regn_cd | String | - | 법정동 지역 코드 |
| l_dong_signgu_cd| String | - | 법정동 시군구 코드 |
| lcls_systm1/2/3 | String | - | 내부 분류 체계 코드 |
| is_custom | Boolean | - | 사용자 직접 등록 장소 여부 |

### Journal_Keywords (일기 키워드 - 매핑 테이블)
일기 엔티티와 별도로 분리되어 키워드 목록을 관리하는 매핑 테이블입니다.

| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| journal_id | Long | FK (Journal.id) | 대상 일기 식별자 |
| keyword | String | - | 등록된 키워드 태그명 |

---

## 3. 엔티티 관계도 (Concept ERD)

```mermaid
erDiagram
    MEMBER ||--o{ JOURNAL : "작성한다"
    MEMBER ||--o{ COMMENT : "댓글을 단다"
    MEMBER ||--o{ TRIP : "커스텀 생성한다"
    
    TRAVEL_PLAN ||--o{ JOURNAL : "포함한다"
    
    JOURNAL ||--o{ COMMENT : "댓글이 달린다"
    JOURNAL ||--o{ JOURNAL_KEYWORDS : "태그를 가진다"