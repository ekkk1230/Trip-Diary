import { useState } from "react";
import * as S from "../../components/journal/Journal.styles";

interface JournalDeatilProps {
    detailType: string;
    journal?: any;
}

function JournalDetail({ detailType, journal }: JournalDeatilProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    detailType === "edit" ? setIsEdit(true) : setIsEdit(false);
    console.log(detailType)

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
                            placeholder="예: 고즈넉한 괴산의 아침, 각연사 산책" 
                            defaultValue={journal?.logTitle}
                        />
                    </S.InputGroup>
            
                    <S.Row>
                        <S.InputGroup>
                            <span>여행 날짜</span>
                            <input 
                                type="date" 
                                defaultValue={journal?.travelDate}
                            />
                        </S.InputGroup>
            
                        <S.InputGroup>
                            <span>날씨</span>
                            <select defaultValue={journal?.weather}>
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
                            <input 
                                type="text" 
                                placeholder="예: 충북 괴산군" 
                                defaultValue={journal?.location}
                            />
                        </S.InputGroup>
            
                        <S.InputGroup>
                            <span>오늘의 기분</span>
                            <input 
                                type="text" 
                                placeholder="예: 평온함" 
                                defaultValue={journal?.mood}
                            />
                        </S.InputGroup>
                    </S.Row>
            
                    <S.InputGroup>
                        <span>여행 기록</span>
                        <textarea 
                            placeholder="오늘 여행은 어떠셨나요? 자유롭게 기록해 보세요."
                            defaultValue={journal?.description}
                        />
                    </S.InputGroup>
                </S.EditForm>
            ) : (
                /* 보기 모드 */
                <S.ViewContent>
                    <h1>{journal.logTitle}</h1>
                    <p>{journal.description}</p>
                </S.ViewContent>
            )}
        </S.DetailContainer>
    );
}

export default JournalDetail;