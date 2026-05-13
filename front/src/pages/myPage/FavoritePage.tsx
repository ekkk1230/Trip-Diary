import CardItem from "../../components/map/CardItem";
import { useMapStore } from "../../store/useMapStore";
import { useNavigate } from "react-router-dom";
import * as S from "../../features/myPage/MyPage.styles"
import { useUserStore } from "../../store/useUserStore";

function FavoritePage() {
    const { user } = useUserStore();
    const { favoriteList } = useMapStore();
    const navigate = useNavigate();

    if ((favoriteList[user?.userId!] || []).length <= 0) {
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
                <h2>내가 찜한 곳 <span>{(favoriteList[user?.userId!] || []).length}</span></h2>
                <p>언제든 다시 꺼내 보고 여행을 계획해 보세요.</p>
            </S.Header>

            <S.GridSection>
                {favoriteList[user?.userId!].map((item) => (
                    <CardItem key={item.contentid} item={item} link={`/mypage/favorite/${item.contentid}`} />
                ))}
            </S.GridSection>
        </S.Container>
    );
}

export default FavoritePage;