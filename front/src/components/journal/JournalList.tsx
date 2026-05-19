import { useNavigate } from "react-router-dom";
import * as S from "../Components.styles"
import { useJournalStore } from "../../store/useJournalStore";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useEffect, type MouseEvent } from "react";

interface JournalListProps {
    type: string;
    contentid?: string;
}

function JournalList({ type, contentid }: JournalListProps) {
    const { isLoading, filteredJournals, removeJournal, likedJournal, likedJournalIds, fetchJournals } = useJournalStore();

    const navigate = useNavigate();

    useEffect(() => { fetchJournals(); }, [])

    // console.log(journals)
    if (isLoading) {
        return (
            <S.Section>
                <div className="loading" style={{ textAlign: 'center', padding: '100px 0' }}>
                    데이터를 불러오는 중입니다... ⏳
                </div>
            </S.Section>
        );
    }

    const displayList = 
        type === "detail" 
        ? filteredJournals.filter(log => log.contentId === contentid)
        : type === "myList"
        ? filteredJournals.filter(log => log.author === "test")
        : filteredJournals;

    const handleEditJournal = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();
        navigate(`/journal/edit/${id}`, { state: { detailType: 'edit', mood: 'edit' } });
    }

    const handleRemove = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();
        if(window.confirm("기록을 삭제하시겠습니까?")) removeJournal(id);
    };

    const handleFavorite = (e: MouseEvent<HTMLButtonElement>, id:string) => {
        e.stopPropagation();
        likedJournal(id)
    };

    return (
        <S.Section>
            {type === "list" && (
                <S.HeaderAction>
                    <S.WriteButton onClick={() => navigate('/journal/write', { state: { detailType: 'edit', mood: 'new' } })}>
                        새로운 기록 남기기 🖋️
                    </S.WriteButton>
                </S.HeaderAction>
            )}
            <S.GridContainer>
                {displayList.length > 0 ? (
                    displayList.map((log) => (
                        <S.Card key={log.id}>
                            <S.AdminButtons>
                                <button 
                                    className="edit-btn"
                                    onClick={e => handleEditJournal(e, log.id!)}
                                >
                                    수정
                                </button>
                                <button 
                                    className="delete-btn"
                                    onClick={e => handleRemove(e, log.id!)}
                                >
                                    삭제
                                </button>
                            </S.AdminButtons>

                            <div onClick={() => navigate(`/journal/${log.id}`, { state: { detailType: 'view' } })} style={{ cursor: 'pointer' }}>
                                <S.ImageWrapper>
                                    <img src={log.mainImage} alt={log.logTitle} />
                                </S.ImageWrapper>
                                    
                                <S.ContentWrapper>
                                    <S.MetaInfo>
                                        <span>{log.travelDate}</span>
                                        <span>{log.location}</span>
                                    </S.MetaInfo>
                                    
                                    <S.LogTitle style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                                        {log.logTitle}
                                    </S.LogTitle>
                                    
                                    {type === "list" && (
                                        <S.Description>{log.description}</S.Description>
                                    )}
                                    
                                    <S.CardFooter>
                                        <div className="tags">
                                            {log.keywords.slice(0, 2).map((tag: string) => (
                                                <span key={tag}>#{tag}</span>
                                            ))}
                                        </div>
                                        <button 
                                            className="stats"
                                            onClick={e => handleFavorite(e, log.id!)}
                                        >
                                            {likedJournalIds.includes(log.id!) ? <GoHeartFill/> : <GoHeart/>} {log.stats.likes}
                                        </button>
                                    </S.CardFooter>
                                </S.ContentWrapper>
                            </div>
                        </S.Card>
                    ))
                ) : (
                    <p className="no_item">
                        기록된 저널이 없습니다. ✍️
                    </p>
                )}
            </S.GridContainer>
            {type === "detail" && (
                <S.FooterAction>
                    <button onClick={() => navigate('/journal')}>
                        내 기록 남기기
                    </button>
                </S.FooterAction>
            )}
        </S.Section>
    );
}

export default JournalList