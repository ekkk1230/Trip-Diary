import { useMapStore } from "../../store/useMapStore";
import { useUserStore } from "../../store/useUserStore";
import * as S from "./MyPage.styles"

interface MyVisitedCountProps {
    visitedLocations: string[];
}

function MyVisitedCount({ visitedLocations }: MyVisitedCountProps) {
    const { user } = useUserStore();
    const { favoriteList, getMyPlaces } = useMapStore();
    
    const visitedPlace = visitedLocations.reduce((acc: any, cur: any) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
    }, {});

    const filteredCustomData = getMyPlaces(user?.nickname);

    const regionCount = Object.keys(visitedPlace).length;

    return (
        <S.CountContainer>
            <S.StatBox>
                <S.Label>방문 지역</S.Label>
                <S.Value>{regionCount}<span>곳</span></S.Value>
            </S.StatBox>
            
            <S.StatBox>
                <S.Label>방문 기록</S.Label>
                <S.Value>{visitedLocations.length}<span>개</span></S.Value>
            </S.StatBox>
            
            <S.StatLink to="/mypage/myspot" $variant="primary">
                <S.Label>나만의 장소</S.Label>
                <S.Value>{filteredCustomData.length}<span>개</span></S.Value>
                <S.ArrowIcon>→</S.ArrowIcon>
            </S.StatLink>
            
            <S.StatLink to="/mypage/favorite" $variant="secondary">
                <S.Label>찜한 곳</S.Label>
                <S.Value className="favorite">{favoriteList.length}<span>곳</span></S.Value>
                <S.ArrowIcon>→</S.ArrowIcon>
            </S.StatLink>
        </S.CountContainer>
    )
}

export default MyVisitedCount