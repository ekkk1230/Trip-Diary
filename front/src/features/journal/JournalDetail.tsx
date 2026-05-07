import { useEffect, useState } from "react";
import * as S from "../../components/journal/Journal.styles";
import { useLocation, useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";
import { TbMoodSmile } from "react-icons/tb";
import { REGION_DATA } from "../../constants/API_CODE_MAP";
import { formatDate } from "../../utils/date";
import { useJournalStore } from "../../store/useJournalStore";


function JournalDetail() {
    const { journalId } = useParams();
    const location = useLocation();
    const { journals, updateJournal } = useJournalStore();

    const journal = journals.find(j => j.id === journalId);
    const mood = location.state.mood || 'edit';
    const detailType = location.state.detailType || 'edit';

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editData, setEditData] = useState({
        logTitle: journal?.logTitle || "",
        travelDate: journal?.travelDate || "",
        weather: journal?.weather || "맑음",
        sido: journal?.location?.split(" ")[0] || "",
        sigungu: journal?.location?.split(" ")[1] || "",
        mood: journal?.mood || "",
        description: journal?.description || "",
        keywords: journal?.keywords || []
    })

    const updateField = (key: string, value: any) => {
        setEditData(prev => ({
            ...prev,
            [key]: value,
            ...(key === 'sido' && { sigungu: "" })
        }));
    };
    
    const sidos = Object.keys(REGION_DATA);
    
    useEffect(() => {
        setIsEdit(detailType === "edit" || mood === "new");
    }, [detailType, mood])

    // console.log(detailType, journal, mood)

    const handleSubmit = () => {
        if (isEdit) {
            const finalLocation = `${editData.sido} ${editData.sigungu}`.trim();

            updateJournal(journal?.id!, {
                ...editData,
                location: finalLocation
            })
        }
        setIsEdit(!isEdit)
    }

    return (
        <S.DetailContainer>
            <button onClick={handleSubmit}>
                {isEdit ? "저장" : "수정"}
            </button>

            {isEdit ? (
                <S.EditForm>
                    <S.InputGroup>
                        <span>여행 제목</span>
                        <input 
                            type="text" 
                            placeholder="제목을 입력하세요." 
                            value={editData.logTitle}
                            onChange={e => updateField('logTitle', e.target.value)}
                        />
                    </S.InputGroup>
            
                    <S.Row>
                        <S.InputGroup>
                            <span>여행 날짜</span>
                            <input 
                                type="date" 
                                value={editData.travelDate}
                                onChange={e => updateField('travelDate', e.target.value)}
                            />
                        </S.InputGroup>
            
                        <S.InputGroup>
                            <span>날씨</span>
                            <select 
                                value={editData.weather}
                                onChange={e => updateField('weather', e.target.value)}
                            >
                                <option value="맑음">맑음 ☀️</option>
                                <option value="흐림">흐림 ☁️</option>
                                <option value="비">비 🌧️</option>
                                <option value="맑음 뒤 흐림">맑음 뒤 흐림 🌤️</option>
                            </select>
                        </S.InputGroup>
                    </S.Row>
            
                    <S.Row>
                        <S.InputGroup>
                            <span>장소</span>
                            <select 
                                value={editData.sido}
                                onChange={e => updateField('sido', e.target.value)}
                            >
                                <option value="">시/도 선택</option>
                                {sidos.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>

                            <select 
                                value={editData.sigungu}
                                onChange={e => updateField('sigungu', e.target.value)}
                            >
                                <option value="">군/구 선택</option>
                                {editData.sido && REGION_DATA[editData.sido].map(sg => <option key={sg} value={sg}>{sg}</option>)}
                            </select>
                        </S.InputGroup>
            
                        <S.InputGroup>
                            <span>오늘의 기분</span>
                            <input 
                                type="text" 
                                placeholder="예: 평온함" 
                                value={editData.mood}
                                onChange={e => updateField('mood', e.target.value)}
                            />
                        </S.InputGroup>
                    </S.Row>
            
                    <S.InputGroup>
                        <span>여행 기록</span>
                        <textarea 
                            placeholder="오늘 여행은 어떠셨나요? 자유롭게 기록해 보세요."
                            value={editData.description}
                            onChange={e => updateField('description', e.target.value)}
                        />
                    </S.InputGroup>
                </S.EditForm>
            ) : (
                /* 보기 모드 */
                <S.ViewContent>
                    {/* 1. 상단 정보 */}
                    <div className="meta-top">
                        <span className="author">@{journal?.author}</span>
                        <span className="stats"><AiOutlineLike />{journal?.stats?.likes}</span>
                        <span className="stats"><FaRegEye /> {journal?.stats?.comments}</span>
                        <span className="date">{formatDate(journal?.travelDate)}</span>
                    </div>

                    {/* 2. 제목 */}
                    <h1>{journal?.logTitle}</h1>

                    {/* 3. 장소 및 날씨 배지 */}
                    <div className="info-badges">
                        <span><MdOutlinePlace /> {journal?.location}</span>
                        <span><TiWeatherSunny /> {journal?.weather}</span>
                        <span><TbMoodSmile /> {journal?.mood}</span>
                    </div>

                    {/* 4. 본문 */}
                    <p className="description">
                        {journal?.description}
                    </p>

                    {/* 5. 키워드 태그 */}
                    <div className="tags">
                        {journal?.keywords?.map((tag: string) => (
                            <span key={tag}>#{tag}</span>
                        ))}
                    </div>
                </S.ViewContent>
            )}
        </S.DetailContainer>
    );
}

export default JournalDetail;