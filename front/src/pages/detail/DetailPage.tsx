import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import * as S from "./DetailPage.styles"
import { fetchDetail } from "../../api/tourApi";
import JournalList from "../../components/journal/JournalList";
import { useUiStore } from "../../store/useUiStore";

function DetailPage() {
    const { setTitle } = useUiStore();
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

    if (!detail) return <div>데이터를 불러오는 중입니다...</div>;

    return (
        <S.Container>
            <S.Title>{detail.title}</S.Title>

            <S.ImageBox>
                <img src={detail.firstimage} alt="" />
            </S.ImageBox>
            
            <S.InfoBox>
                <p><strong>우편번호</strong> {detail.zipcode}</p>
                <p><strong>주소</strong> {detail.addr1} {detail.addr2}</p>
            </S.InfoBox>

            {/* 상세 설명 */}
            <S.Content dangerouslySetInnerHTML={{ __html: detail.overview }} />

            {/* 홈페이지 링크가 있을 때만 버튼 렌더링 */}
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

            {/* 목록으로 돌아가기 버튼 (선택 사항) */}
            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                <button onClick={() => window.history.back()} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#999', textDecoration: 'underline' }}>
                    뒤로 가기
                </button>
            </div>
        </S.Container>
    );
}

export default DetailPage;