import * as S from "./Journal.styles";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";
import { REGION_DATA, CATEGORIES } from "../../constants/region";
import { formatDate } from "../../utils/date";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useJournalDetail } from "../../hooks/useJournalDetail";


function JournalDetail() {
    const {
        userId, editData, isEdit, setIsEdit, setImageFile, likedJournal, 
        journal, mood, sidos, isLiked, 
        updateField, handleImageUpdate, handleSubmit, handleDelete
    } = useJournalDetail();

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
                                value={editData.travelDate ? editData.travelDate.substring(0, 10) : ""}
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

                                <input 
                                    type="text" 
                                    placeholder="상세 장소를 입력하세요 (예: 각연사, 광한루원)" 
                                    value={editData.placeName}
                                    onChange={e => updateField('placeName', e.target.value)}
                                />
                            </div>
                        </S.InputGroup>

                        <S.InputGroup>
                            <span>카테고리</span>
                            <select 
                                value={editData.contentId}
                                onChange={e => updateField('contentId', e.target.value)}
                            >
                                {CATEGORIES.map(cate => (
                                    <option key={cate.id} value={String(cate.id)}>{cate.name}</option>
                                ))}
                            </select>
                        </S.InputGroup>
                    </S.Row>
            
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

                    <S.InputGroup>
                        <span>대표 사진</span>
                        <S.ImageUploadWrapper>
                            <S.FileInputLabel>
                                사진 선택하기
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => handleImageUpdate(e)}
                                />
                            </S.FileInputLabel>

                            {editData.mainImage && (
                                <S.PreviewContainer>
                                    <S.PreviewImage 
                                        src={editData.mainImage} 
                                        alt="미리보기" 
                                    />
                                    <S.DeleteImageButton
                                        type="button"
                                        onClick={() => {
                                            updateField('mainImage', '');
                                            setImageFile(null);
                                        }}
                                    >
                                        ✕
                                    </S.DeleteImageButton>
                                </S.PreviewContainer>
                            )}
                        </S.ImageUploadWrapper>
                    </S.InputGroup>
            
                    <S.InputGroup>
                        <span>여행 기록</span>
                        <textarea 
                            placeholder="오늘 여행은 어떠셨나요? 자유롭게 기록해 보세요."
                            value={editData.description}
                            onChange={e => updateField('description', e.target.value)}
                        />
                    </S.InputGroup>

                    {mood === "new" ? (
                        <button onClick={e => handleSubmit(e)}>등록하기</button>
                    ) : (
                        <button onClick={e => handleSubmit(e)}>확인</button>
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
                            <span className="stats"><FaRegEye /> {journal?.stats?.views}</span>
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

                    {journal?.mainImage && (
                        <img src={`http://localhost:8080${journal.mainImage}`} alt="" />
                    )}

                    {/* 본문 */}
                    <p className="description">
                        {journal?.description}
                    </p>

                    {/* 좋아요 버튼 */}
                    <S.ReactionArea>
                        <p>이 여행기가 마음에 드셨나요?</p>
                        <button 
                            className={isLiked ? 'liked' : ''} 
                            onClick={() => likedJournal(journal?.id!, userId)}
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