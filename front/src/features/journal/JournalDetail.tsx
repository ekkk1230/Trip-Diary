import { useEffect, useState } from "react";
import * as S from "../../components/journal/Journal.styles";
import { useLocation, useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { MdOutlinePlace } from "react-icons/md";
import { TiWeatherSunny } from "react-icons/ti";
import { TbMoodSmile } from "react-icons/tb";
import { REGION_DATA } from "../../constants/API_CODE_MAP";


function JournalDetail() {
    const location = useLocation();

    const journal = location.state.journal || {}; 
    const mood = location.state.mood || 'edit';
    const detailType = location.state.detailType || 'edit';


    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [sido, setSido] = useState("");
    const [sigungu, setSigungu] = useState("");

    const sidos = Object.keys(REGION_DATA);
    
    useEffect(() => {
        setIsEdit(detailType === "edit" || mood === "new");
    }, [detailType, mood])

    console.log(detailType, journal, mood)

    return (
        <S.DetailContainer>
            <button onClick={() => setIsEdit(!isEdit)}>
                {isEdit ? "취소" : "수정하기"}
            </button>

            {isEdit ? (
                <S.EditForm>
                    <S.InputGroup>
                        <span>여행 제목</span>
                        <input 
                            type="text" 
                            placeholder="제목을 입력하세요." 
                            defaultValue={mood === "edit" ? journal?.logTitle : ""}
                        />
                    </S.InputGroup>
            
                    <S.Row>
                        <S.InputGroup>
                            <span>여행 날짜</span>
                            <input 
                                type="date" 
                                defaultValue={mood === "edit" ? journal?.travelDate : ""}
                            />
                        </S.InputGroup>
            
                        <S.InputGroup>
                            <span>날씨</span>
                            <select defaultValue={mood === "edit" ? journal?.weather : ""}>
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
                            {/* <input 
                                type="text" 
                                placeholder="예: 충북 괴산군" 
                                defaultValue={mood === "edit" ? journal?.location : ""}
                            /> */}
                            <select 
                                value={sido} 
                                onChange={e => setSido(e.target.value)}
                            >
                                <option value="">시</option>
                                {sidos.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>

                            <select 
                                value={sigungu}
                                onChange={e => setSigungu(e.target.value)}
                            >
                                <option value="">군구</option>
                                {sido && REGION_DATA[sido].map(sg => <option key={sg} value={sg}>{sg}</option>)}
                            </select>
                        </S.InputGroup>
            
                        <S.InputGroup>
                            <span>오늘의 기분</span>
                            <input 
                                type="text" 
                                placeholder="예: 평온함" 
                                defaultValue={mood === "edit" ? journal?.mood : ""}
                            />
                        </S.InputGroup>
                    </S.Row>
            
                    <S.InputGroup>
                        <span>여행 기록</span>
                        <textarea 
                            placeholder="오늘 여행은 어떠셨나요? 자유롭게 기록해 보세요."
                            defaultValue={mood === "edit" ? journal?.description : ""}
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
                        <span className="date">{journal?.travelDate}</span>
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