import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import * as S from "../../features/map/MapComponents.styles"
import { fetchDetail } from "../../api/tourApi";
import JournalList from "../../components/journal/JournalList";

import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useMapStore } from "../../store/useMapStore";

function DetailPage() {
    const { toggleFavorite, favoriteList, customPlaces } = useMapStore();
    const { contentid } = useParams();
    const [detail, setDetail] = useState<any>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!contentid) return;

            const apiData = await fetchDetail(contentid);
    
            if (apiData) {
                setDetail(apiData);
            } else {
                const customData = customPlaces.find(place => String(place.contentid) === String(contentid));
                if (customData) {
                    setDetail(customData);
                } else {
                    console.error("데이터를 찾을 수 없습니다.");
                }
            }
        };
        
        loadData();
    }, [contentid, customPlaces]);

    console.log(detail)

    const isFavorite = favoriteList.some(fav => fav.contentid === contentid);

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

            <S.ImageBox>
                <img src={detail.firstimage || "/default-img.png"} alt={detail.title} />
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