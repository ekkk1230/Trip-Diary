import styled from "styled-components";

export const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  font-family: 'Pretendard', -apple-system, sans-serif;
  color: #333;
`;

export const DetailHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const Title = styled.h2`
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0;
    color: #333;
    line-height: 1.3;
    word-break: keep-all;
`;

export const FavoriteBtn = styled.button`
    background: none;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
    padding: 10px;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
        transform: scale(1.2);
    }
`;

// 정보 카드 (주소, 우편번호 등)
export const InfoBox = styled.div`
  background: #f9f9f9;
  border-radius: 1.2rem;
  padding: 2rem;
  margin-bottom: 3rem;
  
  p {
    margin: .8rem 0;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
  }

  strong {
    width: 8rem;
    color: #666;
  }
`;

// 본문 내용 (Overview)
export const Content = styled.div`
  line-height: 1.8;
  font-size: 1.2rem;
  color: #444;
  margin-top: 2rem;
  text-align: justify;

  br {
    content: "";
    display: block;
    margin: 1rem 0;
  }
`;

// 홈페이지 버튼
export const HomeButton = styled.a`
  display: inline-flex;
  align-items: center;
  margin-top: 3rem;
  padding: 1.2rem 2.4rem;
  background-color: #2E7D32;
  color: white;
  border-radius: 3rem;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s;

  &:hover {
    background-color: #1b5e20;
    text-decoration: none;
  }
`;

export const ImageBox = styled.div`
    width: 100%;
    height: 25rem;
    border-radius: 1.5rem;
    overflow: hidden;
    margin-bottom: 1rem;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

