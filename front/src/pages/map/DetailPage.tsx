import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import * as S from "../../features/map/MapComponents.styles"
import { fetchDetail } from "../../api/tourApi";
import JournalList from "../../components/journal/JournalList";

import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useMapStore } from "../../store/useMapStore";
import { useUserStore } from "../../store/useUserStore";
import { useUiStore } from "../../store/useUiStore";
import TextModal from "../../components/modal/modalContentLayout/TextModal";
import AddPlaceModal from "../../components/modal/modalContentLayout/AddPlaceModal";

function DetailPage() {
    const { user } = useUserStore();
    const { openModal, closeModal } = useUiStore();
    const { toggleFavorite, favoriteList, customPlaces, removeCustomPlace } = useMapStore();
    const { contentid } = useParams();
    const [detail, setDetail] = useState<any>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            if (!contentid) return;

            const apiData = await fetchDetail(contentid);
    
            if (apiData) {
                setDetail(apiData);
            } else {
                const customData = customPlaces.find(place => place.contentid === contentid);
                if (customData) {
                    setDetail(customData);
                } else {
                    console.error("데이터를 찾을 수 없습니다.");
                }
            }
        };
        
        loadData();
    }, [contentid, customPlaces]);

    // console.log(detail)

    const isFavorite = favoriteList.some(fav => fav.contentid === contentid);
    const isUserPost = user && detail && detail.author === user.nickname;
    // console.log(isUserPost);

    const handleUpdatePost = () => {
        openModal(
            "confirm",
            "나만의 장소 수정",
            <AddPlaceModal detail={detail} />
        )
    }

    const handleRemovePost = (contentid: string) => {
        if (!contentid) return;
        openModal(
            "confirm",
            "게시글 삭제",
            <TextModal txt={"게시글을 삭제하시겠습니까?"} onConfirm={() => {
                removeCustomPlace(contentid);
                navigate('/mypage/myspot', { replace: true });
                closeModal();
            }} />
        );
    };

    if (!detail) return <div>데이터를 불러오는 중입니다...</div>;

    return (
        <S.Container>
            <S.DetailHeader>
                <S.Title>{detail.title}</S.Title>
                <S.FavoriteBtn 
                    onClick={() => toggleFavorite(detail.contentid)}                    
                >
                    {isFavorite ?  <BsBookmarkHeartFill/> : <BsBookmarkHeart/>}
                </S.FavoriteBtn>
            </S.DetailHeader>

            {isUserPost && (
                <S.AdminButtonGroup>
                    <S.AdminButton onClick={handleUpdatePost}>
                        수정하기
                    </S.AdminButton>
                    <S.AdminButton 
                        $type="delete" 
                        onClick={() => handleRemovePost(detail.contentid)}
                    >
                        삭제하기
                    </S.AdminButton>
                </S.AdminButtonGroup>
            )}

            <S.ImageBox>
                <img src={detail.firstimage || `${import.meta.env.BASE_URL}default-image.png`} alt={detail.title} className={!detail.firstimage ? 'no-img' : ''} />
            </S.ImageBox>
            
            <S.InfoBox>
                <p><strong>우편번호</strong> {detail.zipcode}</p>
                <p><strong>주소</strong> {detail.addr1} {detail.addr2}</p>
            </S.InfoBox>

            <S.Content dangerouslySetInnerHTML={{ __html: detail.overview }} />

            {detail?.homepage && detail.homepage !== "" && (
                <S.HomeButton 
                    href={detail.homepage.replace(/(<([^>]+)>)/gi, "")}
                    target="_blank" 
                    rel="noreferrer"
                >
                    공식 홈페이지 방문하기
                </S.HomeButton>
            )}

            <JournalList type="detail" contentid={contentid} />

            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                <button onClick={() => window.history.back()} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#999', textDecoration: 'underline' }}>
                    뒤로 가기
                </button>
            </div>
        </S.Container>
    );
}

export default DetailPage;