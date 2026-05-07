import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import * as S from "./DetailPage.styles"
import { fetchDetail } from "../../api/tourApi";
import JournalList from "../../components/journal/JournalList";
import { useUiStore } from "../../store/useUiStore";

import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useMapStore } from "../../store/useMapStore";

function DetailPage() {
    const { setTitle } = useUiStore();
    const { toggleFavorite, favoriteList } = useMapStore();
    const { contentid } = useParams();
    const [detail, setDetail] = useState<any>(null);

    useEffect(() => {
        setTitle("상세보기");
    }, [setTitle])

    useEffect(() => {
        const loadData = async () => {
            if (contentid) {
                const data = await fetchDetail(contentid);
                setDetail(data);
            }
        };
        
        loadData();
    }, [contentid]);

    // console.log(detail)

    const isFavorite = favoriteList.some(fav => fav.contentid === contentid);

    if (!detail) return <div>데이터를 불러오는 중입니다...</div>;

    return (
        <S.Container>
            {/* 💡 헤더 섹션: 제목과 찜 버튼을 나란히 배치 */}
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

            {detail.homepage && (
                <S.HomeButton 
                    href={detail.homepage.replace(/(<([^>]+)>)/gi, "")}
                    target="_blank" 
                    rel="noreferrer"
                >
                    🌐 공식 홈페이지 방문하기
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