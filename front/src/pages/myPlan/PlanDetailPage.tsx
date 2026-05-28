import { useNavigate, useParams } from "react-router-dom";
import * as S from "./MyPlan.styles";
import { usePlanStore } from "../../store/usePlanStore";
import type { Plan } from "../../types/plan";
import KakaoMapPreview from "../../components/map/KakaoMapPreview";

export const mockPlans: Plan[] = [
    {
        id: 1,
        userId: "user123",
        title: "여수·순천 2박 3일 힐링 식도락 여행",
        startDate: "2026-06-01",
        endDate: "2026-06-03",
        memo: "게장 백반이랑 서대회무침 무조건 먹기! 순천만은 첫날 가고, 둘째 날은 여수 중심!",
        createdAt: "2026-05-28T10:30:00",
        // 🌟 planItem 한 바구니 안에 day: 1, day: 2, day: 3이 섞여서 들어갑니다.
        planItem: [
            // ---------- 1일 차 (순천 코스) ----------
            {
                contentid: "2733967",
                title: "순천만국가정원",
                addr1: "전라남도 순천시 국가정원1호길 47",
                firstimage: "https://images.unsplash.com/photo-1590418606746-018840f9cd0f?q=80&w=400",
                mapx: "127.502",
                mapy: "34.931",
                contenttypeid: "12",
                isCustom: false,
                day: 1 // 👈 1일 차 표시!
            },
            {
                contentid: "126449",
                title: "순천만습지",
                addr1: "전라남도 순천시 순천만길 513",
                firstimage: "",
                mapx: "127.509",
                mapy: "34.889",
                contenttypeid: "12",
                isCustom: false,
                day: 1 // 👈 1일 차 표시!
            },
            // ---------- 2일 차 (여수 코스) ----------
            {
                contentid: "126451",
                title: "여수 오동도",
                addr1: "전라남도 여수시 오동도로 242",
                firstimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400",
                mapx: "127.766",
                mapy: "34.744",
                contenttypeid: "12",
                isCustom: false,
                day: 2 // 👈 2일 차 표시!
            },
            {
                contentid: "2384211",
                title: "여수 해상케이블카",
                addr1: "전라남도 여수시 돌산읍 돌산로 3600-1",
                firstimage: "",
                mapx: "127.745",
                mapy: "34.731",
                contenttypeid: "12",
                isCustom: false,
                day: 2 // 👈 2일 차 표시!
            },
            // ---------- 3일 차 (복귀 코스) ----------
            {
                contentid: "126414",
                title: "여수 향일암",
                addr1: "전라남도 여수시 돌산읍 향일암로 60",
                firstimage: "",
                mapx: "127.808",
                mapy: "34.593",
                contenttypeid: "12",
                isCustom: false,
                day: 3 // 👈 3일 차 표시!
            }
        ]
    },
    {
        id: 2,
        userId: "user123",
        title: "주말 가족 나들이 (경기도 광주 코스)",
        startDate: "2026-06-13",
        endDate: "2026-06-13",
        memo: "부모님 모시고 가니까 천천히 걷는 코스로 유동적으로 이동하기.",
        createdAt: "2026-05-28T10:35:00",
        planItem: [
            {
                contentid: "125432",
                title: "화담숲",
                addr1: "경기도 광주시 도척면 도척윗로 278-1",
                firstimage: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400",
                mapx: "127.293",
                mapy: "37.296",
                contenttypeid: "12",
                isCustom: false,
                day: 1
            },
            {
                contentid: "custom_01",
                title: "남한산성 백숙거리 단골집",
                addr1: "경기도 광주시 남한산성면",
                firstimage: "", // 이미지 없는 경우 예외처리 테스트용
                mapx: "127.182",
                mapy: "37.478",
                contenttypeid: "39", // 음식점 타입 예시
                isCustom: true,
                day: 1
            }
        ]
    }
];

function PlanDetailPage() {
    const { plans } = usePlanStore();
    const { id } = useParams();
    const navigate = useNavigate();

    if (!id) return <div>존재하지 않는 페이지 입니다.</div>;
    
    const plan = mockPlans.find(p => p.id === parseInt(id));

    if (!plan) return <div>존재하지 않는 페이지 입니다.</div>;

    const handleUpdate = (id: string) => {
        navigate(`/myplan/edit/${id}`, { state: plan });
    };

    const handleRemove = (id: string) => {

    };


    return (
        <S.ViewWrap>
            {/* 1. 상단 정보 및 버튼 제어 */}
            <S.ViewHeader>
                <p className="view-date">{plan.startDate} ~ {plan.endDate}</p>
                <h2 className="view-title">{plan.title}</h2>
                {plan.memo && <p className="view-memo">{plan.memo}</p>}
                
                <div className="btn-group">
                    <button className="btn-edit" onClick={() => handleUpdate(id)}>수정</button>
                    <button className="btn-delete" onClick={() => handleRemove(id)}>삭제</button>
                </div>
            </S.ViewHeader>

            {/* 2. 하단 상세 컨텐츠 (Flex 또는 Grid로 좌우 분할) */}
            <S.ViewContent>
                {/* 왼쪽: 코스 타임라인 */}
                <S.TimelineSection>
                    <h3>여행 코스</h3>
                    <ul className="timeline-list">
                        {plan.planItem.map((item, index) => (
                            <li key={item.contentid} className="timeline-item">
                                <span className="order-number">{index + 1}</span>
                                <div className="place-info">
                                    <h4 className="place-name">{item.title}</h4>
                                    <p className="place-addr">{item.addr1}</p>
                                </div>
                                {item.firstimage && <img src={item.firstimage} alt={item.title} className="place-thumb" />}
                            </li>
                        ))}
                    </ul>
                </S.TimelineSection>

                {/* 오른쪽: 지도 고정 박스 */}
                <S.MapSection>
                    <KakaoMapPreview locations={plan.planItem} activeCategory="" onMarkerClick={() => {}} />
                </S.MapSection>
            </S.ViewContent>
        </S.ViewWrap>
    )
}

export default PlanDetailPage