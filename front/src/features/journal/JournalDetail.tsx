import { useEffect, useState } from "react";
import * as S from "./Journal.styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";
import { REGION_DATA } from "../../constants/region";
import { formatDate } from "../../utils/date";
import { useJournalStore } from "../../store/useJournalStore";
import { GoHeart, GoHeartFill } from "react-icons/go";


function JournalDetail() {
    const { id } = useParams();
    const location = useLocation();
    const { journals, addJournal, updateJournal, removeJournal, likedJournal, likedJournalIds, isEdit, setIsEdit } = useJournalStore();

    const navigate = useNavigate();    

    const journal = journals.find(j => j.id === id);
    const mood = location.state.mood || 'edit';
    const detailType = location.state.detailType || 'edit';

    const [editData, setEditData] = useState({
        logTitle: journal?.logTitle || "",
        travelDate: journal?.travelDate || "",
        weather: journal?.weather || "맑음",
        sido: journal?.location?.split(" ")[0] || "",
        sigungu: journal?.location?.split(" ")[1] || "",
        placeName: journal?.placeName || "",
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
        setIsEdit(detailType, mood);
    }, [detailType, mood])

    // console.log(detailType, journal, mood)

    const handleSubmit = () => {
        if (isEdit) {
            const finalLocation = `${editData.sido} ${editData.sigungu}`.trim();
            const finalData = { ...editData, location: finalLocation };

            if (mood === "new") {
                const newJournal = {
                    ...finalData,
                    id: crypto.randomUUID(),
                    contentId: id!,
                    placeName: '',
                    mainImage: '',
                    author: 'test',
                    stats: { likes: 0, comments: 0 },
                    keywords: [],
                }
                addJournal(newJournal);
                setIsEdit(undefined, undefined, false);
                navigate("/journal");
            } else {
                updateJournal(journal?.id!, finalData)
                setIsEdit(undefined, undefined, false);
            }
        }
    }

    const isLiked = likedJournalIds.includes(journal?.id!);

    const handleDelete = (journalId: string) => {
        if (confirm("기록을 삭제하시겠습니까?")) {
            removeJournal(journalId);
            navigate('/journal');
        }
    }

    return (
        <>
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
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {/* 지역 선택 영역 */}
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <select 
                                        value={editData.sido}
                                        onChange={e => updateField('sido', e.target.value)}
                                        style={{ flex: 1 }}
                                    >
                                        <option value="">시/도 선택</option>
                                        {sidos.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>

                                    <select 
                                        value={editData.sigungu}
                                        onChange={e => updateField('sigungu', e.target.value)}
                                        style={{ flex: 1 }}
                                    >
                                        <option value="">군/구 선택</option>
                                        {editData.sido && REGION_DATA[editData.sido].map(sg => (
                                            <option key={sg} value={sg}>{sg}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* 구체적인 장소명 입력 영역 */}
                                <input 
                                    type="text" 
                                    placeholder="상세 장소를 입력하세요 (예: 각연사, 광한루원)" 
                                    value={editData.placeName}
                                    onChange={e => updateField('placeName', e.target.value)}
                                />
                            </div>
                        </S.InputGroup>
            
                        <S.InputGroup>
                            <span>키워드</span>
                            <S.KeywordBadgeGroup>
                                {["힐링", "액티비티", "맛집", "인생샷", "바다"].map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        className={editData.keywords.includes(tag) ? "active" : ""}
                                        onClick={() => {
                                            const nextKeywords = editData.keywords.includes(tag)
                                                ? editData.keywords.filter(k => k !== tag) 
                                                : [...editData.keywords, tag];
                                            updateField('keywords', nextKeywords);
                                        }}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </S.KeywordBadgeGroup>

                            <S.TagInputWrapper>
                                <input 
                                    type="text" 
                                    placeholder="직접 입력 (예: #차박) 후 엔터" 
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = e.currentTarget.value.trim();
                                            if (val && !editData.keywords.includes(val)) {
                                                updateField('keywords', [...editData.keywords, val]);
                                                e.currentTarget.value = '';
                                            }
                                        }
                                    }}
                                />
                            </S.TagInputWrapper>
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

                    {mood === "new" ? (
                        <button onClick={handleSubmit}>등록하기</button>
                    ) : (
                        <button onClick={handleSubmit}>확인</button>
                    )}
                </S.EditForm>
            ) : (
                /* 보기 모드 */
                <S.ViewContent>
                    {/* 상단 정보 */}
                    <div className="meta-top">
                        <div className="left">
                            <span className="author">@{journal?.author}</span>
                            <span className="stats"><AiOutlineLike />{journal?.stats?.likes}</span>
                            <span className="stats"><FaRegEye /> {journal?.stats?.comments}</span>
                            <span className="date">{formatDate(journal?.travelDate)}</span>
                        </div>
                        
                        <div className="actions">
                            <button onClick={() => setIsEdit()} className="btn-edit">수정</button>
                            <button onClick={() => handleDelete(journal?.id!)} className="btn-delete">삭제</button>
                        </div>
                    </div>

                    {/* 제목 */}
                    <h1>{journal?.logTitle}</h1>

                    {/* 장소 및 날씨 배지 */}
                    <div className="info-badges">
                        <span><MdOutlinePlace /> {journal?.location} {journal?.placeName}</span>
                        <span><TiWeatherSunny /> {journal?.weather}</span>
                    </div>

                    {/* 본문 */}
                    <p className="description">
                        {journal?.description}
                    </p>

                    {/* 좋아요 버튼 */}
                    <S.ReactionArea>
                        <p>이 여행기가 마음에 드셨나요?</p>
                        <button 
                            className={isLiked ? 'liked' : ''} 
                            onClick={() => likedJournal(journal?.id!)}
                        >
                            {isLiked ? <GoHeartFill/> : <GoHeart/>} 
                            {journal?.stats?.likes}
                        </button>
                    </S.ReactionArea>

                    {/* 키워드 태그 */}
                    <div className="tags">
                        {journal?.keywords?.map((tag: string) => (
                            <span key={tag}>#{tag}</span>
                        ))}
                    </div>
                </S.ViewContent>
            )}
        </>
    );
}

export default JournalDetail;