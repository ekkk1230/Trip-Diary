import styled, { keyframes, css } from "styled-components";
import { Swiper } from 'swiper/react';

export const MapContainer = styled.div`
  width: 100%;
  margin: 0 auto;

  > svg {
    display: block; margin: 2rem 0;
    border-radius: 1.5rem;
    background-color: #f8f9fa;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.05); 
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-2px); 
    }
  }

  .swiper-pagination { position: relative; margin-top: 1rem; }
  .btn_map {display: block; margin: 2rem auto 1rem; }
`;

export const SearchTxt = styled.div`
  margin-top: 2rem;
  font-size: 1.6rem;
  text-align: center;
  color: #555; 
`;

export const ListContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px; width: 50rem !important;
`;

export const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s;
  cursor: pointer; margin-bottom: 1rem;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardImage = styled.img<{ $noImage?: boolean }>`
  width: 100%;
  height: 150px;
  object-fit: cover; display: block;

  ${(props) =>
        props.$noImage &&
        css`
            object-fit: contain; 
            padding: 20px;  
            opacity: 0.6;        
        `}
`;

export const CardBody = styled.div`
  padding: 12px; height: 10rem; display: flex; flex-direction: column; justify-content: space-between;
`;

export const CardTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardAddress = styled.p`
  margin: 0;
  font-size: 12px;
  color: #666;
`;

export const StyledSwiper = styled(Swiper)`
  .swiper-pagination-fraction {
    bottom: 0rem;
    color: #333;
    font-weight: 700; 
    font-size: 1.4rem;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerWrap = styled.div`
    text-align: center;
    margin-top: 2rem;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2e7d32; 
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

export const FavoriteButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.1);
        background: white;
    }

    &:active {
        transform: scale(0.9);
    }
`;

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
    background: #fff;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .no-img { object-fit: contain; display: block; padding: 1rem 0; }
`;

export const AddCardBtn = styled.div`
    height: 100%; 
    border: 2px dashed #ccc;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #fafafa;
    
    .add_content {
        text-align: center;
        color: #888;
        span { font-size: 24px; font-weight: bold; }
        p { font-size: 14px; margin-top: 8px; }
    }

    &:hover {
        background-color: #f1f8e9;
        border-color: #a5d6a7;
        color: #2e7d32;
    }
`;

export const NoResultWrap = styled.div`
    text-align: center;
    padding: 40px 0;
    
    .add_direct_btn {
        margin-top: 15px;
        padding: 10px 20px;
        background-color: #26a69a;
        color: white;
        border-radius: 8px;
        border: none;
        cursor: pointer;
    }
`;

export const AdminButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: -10px; /* 제목과의 간격 조정 */
    margin-bottom: 15px;
`;

export const AdminButton = styled.button<{ $type?: 'edit' | 'delete' }>`
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.85rem;
    cursor: pointer;
    border: 1px solid #eee;
    background-color: white;
    color: ${props => props.$type === 'delete' ? '#ff4d4f' : '#666'};
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.$type === 'delete' ? '#fff1f0' : '#f5f5f5'};
        border-color: ${props => props.$type === 'delete' ? '#ffccc7' : '#ddd'};
    }
`;