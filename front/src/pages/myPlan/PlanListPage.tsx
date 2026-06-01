import { Link } from "react-router-dom";
import { usePlanStore } from "../../store/usePlanStore";
import type { Plan } from "../../types/plan";
import * as S from "./MyPlan.styles";

export const MOCK_PLAN: Plan[] = [
    {
        id: 1,
        userId: "user123",
        title: "경기도 광주 힐링 여행",
        startDate: "2026-06-13",
        endDate: "2026-06-13",
        memo: "부모님과 함께하는 여유로운 코스",
        createdAt: "2026-05-28T10:00:00",
        planItem: [
            {
                contentid: "125432",
                title: "화담숲",
                addr1: "경기도 광주시 도척면...",
                firstimage: "https://example.com/hwadam.jpg",
                mapx: "127.293",
                mapy: "37.296",
                contenttypeid: "12",
                isCustom: false,
                day: 1,
                visitOrder: 1
            },
            {
                contentid: "custom_01",
                title: "남한산성 백숙거리",
                addr1: "경기도 광주시 남한산성면",
                firstimage: "",
                mapx: "127.182",
                mapy: "37.478",
                contenttypeid: "39",
                isCustom: true,
                day: 1,
                visitOrder: 2
            }
        ]
    }
];

function PlanList() {
    const { plans, fetchPlan } = usePlanStore();
    console.log(plans)

    return (
        <S.PlanWrap>
            {MOCK_PLAN.length >= 1 ? (
                <>
                    <S.LinkBtn className="linkBtn" to={`/myplan/write`}>새로운 일정 계획하기</S.LinkBtn>
                    
                    <S.PlanList>
                        {MOCK_PLAN.map(item => (
                            <li key={item.id}>
                                <Link to={`/myplan/${item.id}`}>
                                    <p className="item-date">{item.startDate} ~ {item.endDate}</p>
                                    <p className="item-tit">{item.title}</p>
                                </Link>
                            </li>
                        ))}
                    </S.PlanList>
                </>
            ) : (
                <S.NoPlane>
                    <p className="no-title">현재 계획된 일정이 없습니다.</p>
                    <p className="no-desc">새로운 일정을 계획해 볼까요?</p>

                    <S.LinkBtn to={`/plan/write`}>새로운 일정 계획하기</S.LinkBtn>
                </S.NoPlane>
            )}
        </S.PlanWrap>
    )
}

export default PlanList