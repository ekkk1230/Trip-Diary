import { useState, useEffect } from "react"; // useState 추가
import { useParams } from "react-router-dom";

function DetailPage() {
    const { contentid } = useParams();
    const [detail, setDetail] = useState<any>(null); // 데이터를 저장할 상태
    const [loading, setLoading] = useState(true);   // 로딩 상태

    const fetchDetail = async () => {
        try {
            // 1. 공공데이터 상세정보 조회 URL (detailCommon1 등)
            const baseUrl = "https://apis.data.go.kr/B551011/KorService1/detailCommon1";
            const params = new URLSearchParams({
                serviceKey: import.meta.env.VITE_APP_TOUR_API_KEY,
                MobileOS: "ETC",
                MobileApp: "AppTest",
                _type: "json",
                contentId: contentid!, // 전달받은 ID
                defaultYN: "Y",
                firstImageYN: "Y",
                addrYN: "Y",
                mapinfoYN: "Y",
                overviewYN: "Y",
            });

            const response = await fetch(`${baseUrl}?${params.toString()}`);
            const data = await response.json();
            
            // 공공데이터 특유의 복잡한 데이터 구조 접근
            const item = data.response.body.items.item[0]; 
            console.log("상세 데이터:", item);
            setDetail(item); 
        } catch (error) {
            console.error("상세 데이터 로딩 실패:", error);
        }
    };

    useEffect(() => {
        if (contentid) fetchDetail();
    }, [contentid]);

    if (loading) return <div>로딩 중...</div>;
    if (!detail) return <div>데이터를 찾을 수 없습니다.</div>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>{detail.title}</h1> {/* 데이터의 실제 제목 출력 */}
            <img src={detail.firstimage} alt={detail.title} style={{ width: '100%' }} />
            <p>{detail.overview}</p> {/* 상세 설명 등 */}
            {/* API가 주는 필드명에 맞춰서 출력하세요! */}
        </div>
    );
}

export default DetailPage;