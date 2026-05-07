import styled from 'styled-components';

export const GhostButton = styled.button`
  padding: 12px 30px;
  background: transparent;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9f9f9;
    color: #333;
    border-color: #bbb;
  }
`;

// 전체 페이지 컨테이너
export const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 15px;
    background-color: #fff; // 모바일에서는 깔끔하게 화이트로 전환
  }
`;

// 상단 헤더 (뒤로가기, 수정/저장 버튼 영역)
export const ActionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 20px;
  position: sticky;
  top: 0;
  background-color: rgba(248, 249, 250, 0.8);
  backdrop-filter: blur(8px);
  z-index: 10;
  
  button {
    background: none;
    border: none;
    font-size: 15px;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: #222;
    }
  }
`;

// 보기 모드일 때의 콘텐츠 레이아웃
export const ViewContent = styled.article`
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  /* 상단 메타 정보 영역 */
  .meta-top {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
    font-size: 14px;
    color: #888;

    .author {
      font-weight: 700;
      color: #3498db;
      margin-right: auto; // 작성자를 왼쪽 끝으로 밀고 나머지는 오른쪽 정렬
    }

    .stats {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #666;
      
      svg {
        font-size: 16px;
        color: #999;
      }
    }

    .date {
      color: #adb5bd;
      padding-left: 5px;
    }
  }

  /* 메인 제목 */
  h1 {
    font-size: 28px;
    font-weight: 800;
    line-height: 1.4;
    margin-bottom: 24px;
    color: #1a1a1a;
    word-break: keep-all;
  }

  /* 정보 배지 */
  .info-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 35px;
    
    span {
      padding: 6px 14px;
      background: #f8f9fa;
      border: 1px solid #eee;
      border-radius: 50px; // 둥근 캡슐 모양
      font-size: 13px;
      color: #495057;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  /* 본문 */
  .description {
    font-size: 17px;
    line-height: 1.9;
    color: #333;
    white-space: pre-wrap;
    margin-bottom: 50px;
    letter-spacing: -0.01em;
  }

  /* 태그 */
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 25px;
    border-top: 1px solid #f1f3f5;

    span {
      font-size: 14px;
      color: #3498db;
      background: #f0f7ff;
      padding: 5px 12px;
      border-radius: 6px;
      font-weight: 500;
      transition: all 0.2s;

      &:hover {
        background: #3498db;
        color: #fff;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 25px;
    
    .meta-top {
      flex-wrap: wrap;
      gap: 10px;
      
      .author { width: 100%; margin-bottom: 5px; }
    }
    
    h1 { font-size: 22px; }
  }
`;

// 저장 버튼 포인트 스타일
export const SaveButton = styled.button`
  color: #3498db !important;
  font-weight: 700 !important;
`;

// 수정 버튼 스타일
export const EditButton = styled.button`
  color: #888 !important;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
`;

export const InputGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 14px;
    font-weight: 600;
    color: #444;
  }

  input, textarea, select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const CommentSection = styled.section`
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid #eee;
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;

  textarea {
    width: 100%;
    min-height: 80px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 10px;
    resize: none;
    font-size: 14px;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }
  }

  button {
    align-self: flex-end;
    padding: 8px 20px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #2980b9;
    }
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`;

export const CommentItem = styled.div`
  padding: 1.5rem 0;
  border-bottom: 1px solid #f1f3f5;

  &:last-child {
    border-bottom: none;
  }

  .comment-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.6rem;

    .user-name {
      font-weight: 700;
      font-size: 1.4rem;
      color: #212529;
      margin-right: 8px;
    }

    .comment-date {
      font-size: 1.2rem;
      color: #adb5bd;
    }

    /* 버튼 그룹: 날짜 오른쪽에 배치 */
    .comment-actions {
      display: flex;
      gap: 8px;
      margin-left: auto; // 버튼들을 오른쪽 끝으로 밀기

      button {
        background: none;
        border: none;
        padding: 0;
        font-size: 1rem;
        color: #adb5bd;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
          color: #495057;
          text-decoration: underline;
        }

        &.delete-btn:hover {
          color: #e74c3c; // 삭제는 빨간색 계열로 강조
        }
      }
    }
  }

  .comment-text {
    font-size: 1.4rem;
    line-height: 1.6;
    color: #495057;
    white-space: pre-wrap;
    word-break: break-all;
    width: 100%;
  }
`;

export const ReactionArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    border-top: 1px solid #eee;
    margin-top: 40px;

    p {
        font-size: 0.9rem;
        color: #888;
        margin-bottom: 15px;
    }

    button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 24px;
        border-radius: 30px;
        border: 1px solid #ddd;
        background: white;
        font-size: 1.2rem;
        font-weight: 600;
        color: #555;
        cursor: pointer;
        transition: all 0.2s ease;

        svg {
            font-size: 1.2rem;
        }

        /* 좋아요 눌렀을 때 스타일 */
        &.liked {
            background: #fff0f0;
            border-color: #ff6b6b;
            color: #ff6b6b;
            transform: scale(1.05);
        }

        &:active {
            transform: scale(0.95);
        }
    }
`;
