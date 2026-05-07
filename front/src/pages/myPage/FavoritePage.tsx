import CardItem from "../../features/map/CardItem";
import { useMapStore } from "../../store/useMapStore";
import { useNavigate } from "react-router-dom";
import * as S from "../../features/myPage/MyPage.styles"

function FavoritePage() {
    const { favoriteList } = useMapStore();
    const navigate = useNavigate();

    // 데이터가 없을 때의 감성적인 처리
    if (favoriteList.length <= 0) {
        return (
            <S.EmptyWrapper>
                <div className="icon">📍</div>
                <h3>찜한 장소가 없어요</h3>
                <p>가고 싶은 여행지를 찾아서<br/>별표를 눌러 저장해 보세요!</p>
                <button onClick={() => navigate("/")}>지도에서 찾아보기</button>
            </S.EmptyWrapper>
        );
    }

    return (
        <S.Container>
            <S.Header>
                <h2>내가 찜한 곳 <span>{favoriteList.length}</span></h2>
                <p>언제든 다시 꺼내 보고 여행을 계획해 보세요.</p>
            </S.Header>

            <S.GridSection>
                {favoriteList.map((item) => (
                    <CardItem key={item.contentid || item.id} item={item} />
                ))}
            </S.GridSection>
        </S.Container>
    );
}

export default FavoritePage;