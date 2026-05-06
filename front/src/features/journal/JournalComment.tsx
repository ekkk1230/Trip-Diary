import { useEffect, useState } from "react";
import * as S from "../../components/journal/Journal.styles"

import mockData from "../../assets/data/mock_comment.json"
import { useLocation } from "react-router-dom";

interface MockComment {
    id: string;
    user: string;
    journalId: number;
    date: string;
    text: string;
}

const MOCK_COMMENTS: MockComment[] = mockData;

function JournalComment() {
    const location = useLocation();
    const journal = location.state.journal;
    // console.log('journal', journal)

    const [commentList, setCommentList] = useState<any[]>([]);
    const [commentText, setCommentText] = useState<string>("");

    useEffect(() => {
        setCommentList(MOCK_COMMENTS);
    }, [])

    // console.log('commentList',commentList)
    const filterComment = commentList.filter(c => c.journalId === parseInt(journal.id));
    // console.log('filterComment', filterComment)

    const handleSubmit = () => {
        if (!commentText.trim()) return alert("입력후 확인을 눌러주세요.");
        setCommentText('');
    }

    return (
        <>
            <S.CommentInputWrapper>
                <textarea 
                placeholder="이 여행지에 대한 생각을 남겨보세요."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                />
                <button onClick={handleSubmit}>등록</button>
            </S.CommentInputWrapper>

            <S.CommentList>
                {filterComment.length > 0 ? (
                    filterComment.map((c) => (
                        <S.CommentItem key={c.id}>
                            <div className="comment-header">
                                <span className="user-name">{c.user}</span>
                                <span className="comment-date">{c.date}</span>

                                <div className="comment-actions">
                                    <button 
                                        className="edit-btn" 
                                        onClick={() => console.log(`${c.id}번 댓글 수정 모드 진입`)}
                                    >
                                        수정
                                    </button>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => {
                                            if(window.confirm("댓글을 삭제하시겠습니까?")) {
                                                console.log(`${c.id}번 댓글 삭제 실행`);
                                            }
                                        }}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                            <p className="comment-text">{c.text}</p>
                        </S.CommentItem>
                    ))
                ) : (
                    <p style={{ 
                        textAlign: 'center', 
                        padding: '3rem 0', 
                        color: '#adb5bd',
                        fontSize: '0.9rem' 
                    }}>
                        아직 작성된 댓글이 없습니다. 첫 마디를 남겨보세요! ✍️
                    </p>
                )}
            </S.CommentList>
        </>
    )
}

export default JournalComment