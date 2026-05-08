import { useState } from "react";
import * as S from "./Journal.styles"
import { useJournalStore } from "../../store/useJournalStore";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/date";


function JournalComment() {
    const { journals, comments, addComment, updateComment, removeComment } = useJournalStore();
    const { id } = useParams();
    const journal = journals.find(j => j.id === id);

    const [commentText, setCommentText] = useState<string>("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>("");


    const filterComment = comments.filter(c => c.journalId === parseInt(journal?.id!));

    const handleSubmit = () => {
        if (!commentText.trim()) return alert("입력후 확인을 눌러주세요.");

        const newComment = {
            id: crypto.randomUUID(),
            user: 'test',
            journalId: parseInt(journal?.id!),
            date: formatDate(),
            text: commentText,
        }

        addComment(newComment);
        setCommentText('');
    }

    const handleEdit = (commentId: string, originalText: string) => {
        if (editingId === commentId) {
            updateComment(commentId, { text: editText });
            setEditingId(null);
            setEditText("");
        } else {
            setEditingId(commentId);
            setEditText(originalText);
        }
    }

    const handleRemove = (id: string) => { 
        if(window.confirm("댓글을 삭제하시겠습니까?")) removeComment(id);
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
                                        onClick={() => handleEdit(c.id, c.text)}
                                    >
                                        {editingId === c.id ? '확인' : '수정'}
                                    </button>
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleRemove(c.id)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                            {editingId === c.id ? (
                                <input 
                                    className="comment-text" 
                                    type="text" 
                                    defaultValue={c.text} 
                                    value={editText}
                                    autoFocus 
                                    onChange={e => setEditText(e.target.value)}
                                />
                            ) : (
                                <p className="comment-text">{c.text}</p>
                            )}
                            
                        </S.CommentItem>
                    ))
                ) : (
                    <p style={{ 
                        textAlign: 'center', 
                        padding: '3rem 0', 
                        color: '#adb5bd',
                        fontSize: '1.2rem' 
                    }}>
                        아직 작성된 댓글이 없습니다. 첫 마디를 남겨보세요! ✍️
                    </p>
                )}
            </S.CommentList>
        </>
    )
}

export default JournalComment