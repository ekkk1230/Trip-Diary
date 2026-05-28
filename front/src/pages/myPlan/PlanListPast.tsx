import { Link } from "react-router-dom";
import { usePlanStore } from "../../store/usePlanStore";
import type { Plan } from "../../types/plan";
import * as S from "./MyPlan.styles";

export const mockPlans: Plan[] = [
    {
        id: 1,
        userId: "user123",
        title: "여수·순천 2박 3일 힐링 식도락 여행",
        startDate: "2026-06-01",
        endDate: "2026-06-03",
        memo: "게장 백반이랑 서대회무침 무조건 먹기! 순천만 국가정원은 둘째 날 아침 일찍 가야 안 더움.",
        createdAt: "2026-05-28T10:30:00",
        planItem: [
            {
                contentid: "2733967",
                title: "순천만국가정원",
                addr1: "전라남도 순천시 국가정원1호길 47",
                firstimage: "https://images.unsplash.com/photo-1590418606746-018840f9cd0f?q=80&w=400", // 테스트용 임시 이미지 주소
                mapx: "127.502",
                mapy: "34.931",
                contenttypeid: "12",
                isCustom: false
            },
            {
                contentid: "126451",
                title: "여수 오동도",
                addr1: "전라남도 여수시 오동도로 242",
                firstimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400",
                mapx: "127.766",
                mapy: "34.744",
                contenttypeid: "12",
                isCustom: false
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
                isCustom: false
            },
            {
                contentid: "custom_01",
                title: "남한산성 백숙거리 단골집",
                addr1: "경기도 광주시 남한산성면",
                firstimage: "", // 이미지 없는 경우 예외처리 테스트용
                mapx: "127.182",
                mapy: "37.478",
                contenttypeid: "39", // 음식점 타입 예시
                isCustom: true // ⭐️ 사용자님이 직접 등록한 커스텀 장소 테스트용!
            }
        ]
    }
];

function PlanListPast() {
    const { plans, fetchPlan } = usePlanStore();
    console.log(plans)

    return (
        <S.PlanWrap>
            {mockPlans.length >= 1 ? (
                <>
                    <S.LinkBtn className="linkBtn" to={`/plan/write`}>새로운 일정 계획하기</S.LinkBtn>
                    <S.PlanList>
                        {mockPlans.map(item => (
                            <li key={item.id}>
                                <Link to={`/plan/${item.id}`}>
                                    <p>{item.title}</p>
                                    <p>{item.startDate} ~ {item.endDate}</p>
                                </Link>
                            </li>
                        ))}
                    </S.PlanList>
                </>
            ) : (
                <div>
                    <p>현재 계획된 일정이 없습니다.</p>
                    <p>새로운 일정을 계획해 볼까요?</p>

                    <S.LinkBtn to={`/plan/write`}>새로운 일정 계획하기</S.LinkBtn>
                </div>
            )}
        </S.PlanWrap>
    )
}

export default PlanListPast