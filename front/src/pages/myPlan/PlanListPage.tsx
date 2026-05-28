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
        memo: "게장 백반이랑 서대회무침 무조건 먹기! 순천만은 첫날 가고, 둘째 날은 여수 중심!",
        createdAt: "2026-05-28T10:30:00",
        planItem: [
            {
                contentid: "2733967",
                title: "순천만국가정원",
                addr1: "전라남도 순천시 국가정원1호길 47",
                firstimage: "https://images.unsplash.com/photo-1590418606746-018840f9cd0f?q=80&w=400",
                mapx: "127.502",
                mapy: "34.931",
                contenttypeid: "12",
                isCustom: false,
                day: 1 
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
                day: 1 
            },
            {
                contentid: "126451",
                title: "여수 오동도",
                addr1: "전라남도 여수시 오동도로 242",
                firstimage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400",
                mapx: "127.766",
                mapy: "34.744",
                contenttypeid: "12",
                isCustom: false,
                day: 2 
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
                day: 2 
            },
            {
                contentid: "126414",
                title: "여수 향일암",
                addr1: "전라남도 여수시 돌산읍 향일암로 60",
                firstimage: "",
                mapx: "127.808",
                mapy: "34.593",
                contenttypeid: "12",
                isCustom: false,
                day: 3 
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
                firstimage: "", 
                mapx: "127.182",
                mapy: "37.478",
                contenttypeid: "39", 
                isCustom: true,
                day: 1
            }
        ]
    }
];

function PlanList() {
    const { plans, fetchPlan } = usePlanStore();
    console.log(plans)

    return (
        <S.PlanWrap>
            {mockPlans.length >= 1 ? (
                <>
                    <S.LinkBtn className="linkBtn" to={`/myplan/write`}>새로운 일정 계획하기</S.LinkBtn>
                    
                    <S.PlanList>
                        {mockPlans.map(item => (
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