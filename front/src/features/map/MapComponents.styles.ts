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

// 1. 전체 페이지 레이아웃 (스크롤 방지)
export const PlannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* 전체 화면 높이 사용 */
  width: 100%;
  overflow: hidden;
`;

// 2. 상단 (보관함 + 일정 리스트)
export const TopSection = styled.div`
  display: flex;
  flex: 1; /* 남는 세로 공간을 모두 차지 */
  min-height: 0; /* flex 자식의 overflow 처리를 위해 필요 */
`;

// 3. 좌측 장소 보관함
export const PlaceStorage = styled.aside`
  width: 40%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  background-color: white;
`;

export const StorageHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  h3 { font-size: 1.125rem; font-weight: 700; }
`;

// 카테고리 버튼들을 감싸는 가로 스크롤 가능한 컨테이너
export const CategoryTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 1rem;
  overflow-x: auto;
  padding-bottom: 4px;
  width: 100%;

  /* 스크롤바 숨기기 (선택 사항) */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

// 개별 카테고리 버튼
// $active 프로퍼티로 현재 선택된 상태를 구분합니다.
export const CategoryTab = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  flex-shrink: 0;
  white-space: nowrap; // 글자 줄바꿈 방지
  cursor: pointer;
  transition: all 0.2s ease;

  border: 1px solid ${props => props.$active ? '#2563eb' : '#e5e7eb'};
  background-color: ${props => props.$active ? '#2563eb' : 'white'};
  color: ${props => props.$active ? 'white' : '#6b7280'};

  &:hover {
    border-color: #2563eb;
    color: ${props => props.$active ? 'white' : '#2563eb'};
  }
`;

export const StorageList = styled.div`
  flex: 1;
  overflow-y: auto; /* 목록이 길어지면 내부 스크롤 */
  padding: 1rem;
`;

// 4. 우측 일정 패널 (DND)
export const SchedulePanel = styled.section`
  flex: 1; /* 보관함을 제외한 모든 가로 공간 차지 */
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
`;

export const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #1f2937;
  }
`;

export const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: #fee2e2;
    color: #ef4444;
  }

  svg {
    margin-top: -1px;
  }
`;

export const ScheduleList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StorageItemButton = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 10px;
  text-align: left;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;
  background-color: ${props => props.$active ? "#eff6ff" : "white"};
  color: ${props => props.$active ? "#2563eb" : "#374151"};
  border-color: ${props => props.$active ? "#2563eb" : "#e5e7eb"};

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const DraggableItem = styled.div<{ $isDragging: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  margin-bottom: 12px;
  background-color: ${props => props.$isDragging ? '#f8fafc' : 'white'};
  border: 1px solid ${props => props.$isDragging ? '#3b82f6' : '#e5e7eb'};
  border-radius: 12px;
  box-shadow: ${props => props.$isDragging 
    ? '0 10px 15px -3px rgba(59, 130, 246, 0.2)' 
    : '0 1px 3px rgba(0, 0, 0, 0.1)'};
  transition: all 0.2s ease;
  cursor: grab;

  &:hover {
    border-color: #3b82f6;
  }

  &:active {
    cursor: grabbing;
  }
`;

// 순서 번호 배지
export const IndexBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #3b82f6;
  color: white;
  font-size: 12px;
  font-weight: 700;
  border-radius: 50%;
  flex-shrink: 0;
`;

// 정보 텍스트 영역
export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 15px;
    color: #1f2937;
    font-weight: 600;
  }

  span {
    font-size: 13px;
    color: #6b7280;
  }
`;

// 삭제 버튼
export const RemoveButton = styled.button`
  padding: 4px;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ef4444;
  }
`;

// 5. 하단 지도 섹션
export const MapWrapper = styled.div`
  height: 40%; /* 화면의 40% 고정 차지 */
  width: 100%;
  border-top: 2px solid #e5e7eb;
  position: relative;
`;

export const MapCategoryNav = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 8px;
  background: white;
  padding: 6px;
  border-radius: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const MapCategoryBtn = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 30px;
  border: none;
  background: ${props => props.$active ? '#3b82f6' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#4b5563'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.$active ? '#2563eb' : '#f3f4f6'};
  }
`;