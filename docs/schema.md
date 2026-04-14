# 🗄️ 데이터베이스 스키마 설계 (Database Schema)

`TripDiary` 프로젝트의 핵심 데이터 구조입니다. 사용자 정보, 여행지 정보, 그리고 디지털 엽서(일기) 간의 관계를 정의합니다.

---

## 1. 개요
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA
- **Design Intent**: 
  - 사진 데이터는 서버 부하를 줄이기 위해 **AWS S3 URL** 주소만 저장합니다.
  - 혼잡도 데이터는 실시간성이 중요하므로 DB에 저장하지 않고 **외부 API**에서 즉시 호출합니다.
  - **공유 및 소셜 기능**: 사용자가 자신의 기록을 커뮤니티에 노출할지 결정할 수 있으며, 타 사용자와의 소통 기능을 포함합니다.

---

## 2. 테이블 상세 구조

### 👤 User (사용자)
사용자 계정 정보 및 인증을 위한 테이블입니다.

| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK, Auto Increment | 고유 식별자 |
| email | String | Unique, Not Null | 로그인용 이메일 |
| password | String | Not Null | 암호화된 비밀번호 |
| nickname | String | Not Null | 서비스 내 활동명 |
| created_at | DateTime | Not Null | 가입 일시 |

### 📍 Place (명소/장소)
한국관광공사 TourAPI 등에서 가져온 명소 정보를 캐싱하고 활용합니다.

| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK | API 제공 contentId 활용 |
| title | String | Not Null | 장소 명칭 |
| addr | String | - | 상세 주소 |
| area_code | String | Index | 지역 코드 (도 단위) |
| sigungu_code| String | - | 시/군/구 코드 |
| first_image | String | - | 대표 이미지 URL |
| map_x | Double | Not Null | GPS 경도 |
| map_y | Double | Not Null | GPS 위도 |

### ✉️ Journal (여행 일기/엽서)
사용자가 직접 생성한 디지털 엽서와 한 줄 기록이 저장되는 핵심 테이블입니다.

| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK, Auto Increment | 고유 식별자 |
| user_id | Long | FK (User.id) | 작성자 식별자 |
| place_id | Long | FK (Place.id) | 여행지 식별자 |
| image_url | String | Not Null | S3에 저장된 합성 엽서 이미지 경로 |
| content | String(500) | - | 사용자가 작성한 한 줄 일기 |
| visit_date | Date | Not Null | 실제 여행 일자 |
| created_at | DateTime | Not Null | 데이터 생성 일시 |
| is_public | Boolean | Not Null, Default: true | **전체 공개 여부 (공유 설정)** |
| view_count | Integer | Default: 0 | 조회수 |

### 💬 Comment (댓글)
| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK, Auto Increment | 고유 식별자 |
| journal_id | Long | FK (Journal.id) | 대상 일기 식별자 |
| user_id | Long | FK (User.id) | 댓글 작성자 식별자 |
| content | String(200) | Not Null | 댓글 내용 |
| created_at | DateTime | Not Null | 작성 시간 |

### ❤️ Favorite (좋아요)
| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK, Auto Increment | 고유 식별자 |
| journal_id | Long | FK (Journal.id) | 대상 일기 식별자 |
| user_id | Long | FK (User.id) | 좋아요 누른 사용자 식별자 |
| created_at | DateTime | Not Null | 누른 시간 |

### ⭐ Bookmark (즐겨찾기)
혼잡도를 확인한 후 나중에 가보고 싶은 곳을 저장합니다.

| 컬럼명 | 타입 | 제약사항 | 설명 |
| :--- | :--- | :--- | :--- |
| id | Long | PK, Auto Increment | 고유 식별자 |
| user_id | Long | FK (User.id) | 사용자 식별자 |
| place_id | Long | FK (Place.id) | 장소 식별자 |

---

## 3. 엔티티 관계도 (Concept ERD)

```mermaid
erDiagram
    USER ||--o{ JOURNAL : "작성한다"
    USER ||--o{ BOOKMARK : "저장한다"
    USER ||--o{ COMMENT : "댓글을 쓴다"
    USER ||--o{ FAVORITE : "좋아요를 누른다"
    
    PLACE ||--o{ JOURNAL : "기록된다"
    PLACE ||--o{ BOOKMARK : "포함된다"
    
    JOURNAL ||--o{ COMMENT : "댓글이 달린다"
    JOURNAL ||--o{ FAVORITE : "좋아요를 받는다"