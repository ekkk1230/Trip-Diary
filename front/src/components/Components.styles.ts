import styled, { keyframes } from "styled-components";

export const SearchContainer = styled.div`
    width: 100%;
    position: relative; 

    background: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    border-radius: .8rem;
    box-shadow: 0 .4rem .6rem rgba(0,0,0,0.1);

    select { background: #fff; width: 14rem; }
    input { background: #fff; width: 80% }
    button { white-space: nowrap; width: 10rem; }
`;

export const SearchCategoryContainer = styled.div`
    width: 100%; display: flex; gap: .8rem; margin-top: 1.2rem; flex-flow: row wrap; justify-content: center;

    .filter-btn { width: 4rem; height: 4rem; min-width: 4rem; padding: 0; display: flex; align-items: center; justify-content: center; }

    .btn-wrap { 
        width: 100%; display: flex; gap: .8rem; height: 0; overflow: hidden; transition: height .3s ease;

        button { width: 100%; background: #fff; border: .1rem solid rgba(45, 125, 110, 0.12); font-size: 1.2rem; word-break: keep-all; }
        button:hover, button.active { background: #fff; border: .1rem solid #2d7d6e; color: #2d7d6e }
    }
    .btn-wrap.isOpen { height: auto; }
`
export const SearchInputArea = styled.div`
    display: flex; gap: .8rem;

    input { flex: 1; }
    button { white-space: nowrap; width: 10rem; cursor: pointer; }
`;

export const SuggestionList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    list-style: none;
    padding: 0;
    margin: .5rem 0 0 0;
    border-radius: .4rem;
    max-height: 20rem;
    overflow-y: auto;
    border: .1rem solid #ddd;
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

export const Section = styled.section`
  padding: 40px 0;
  width: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  position: relative;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    
    .admin-buttons {
      opacity: 1;
    }
  }
`;

export const AdminButtons = styled.div.attrs({ className: 'admin-buttons' })`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
  z-index: 10;
  opacity: 0; 
  transition: opacity 0.2s ease;

  button {
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
    cursor: pointer;
    transition: all 0.2s;

    &.edit-btn:hover {
      background: #3498db;
      color: #fff;
      border-color: #3498db;
    }

    &.delete-btn:hover {
      background: #e74c3c;
      color: #fff;
      border-color: #e74c3c;
    }
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MoodBadge = styled.span`
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  color: #333;
`;

export const ContentWrapper = styled.div`
  padding: 20px;
`;

export const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 13px;
  color: #888;
`;

export const LogTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #222;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  height: 45px;
  overflow: hidden;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #f1f1f1;

  .tags {
    display: flex;
    gap: 8px;
    span {
      font-size: 12px;
      color: #3498db;
      background: #ebf5fb;
      padding: 2px 8px;
      border-radius: 4px;
    }
  }

  .stats {
    font-size: 13px;
    color: #999;
  }
`;

export const HeaderAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
  padding: 0 10px;
`;

export const WriteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${float} 3s ease-in-out infinite;

  &:hover {
    background: #2980b9;
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const FooterAction = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding-bottom: 20px;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 50rem;
  top: 0;
  left: 0;
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

export const TravelInfoTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -8px 0; // 카드 사이 간격 조절
  position: relative;
  z-index: 1;

  .line {
    width: 2px;
    height: 30px;
    background: #e5e7eb;
    border-style: dashed;
  }

  .info {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 11px;
    color: #6b7280;
    font-weight: 500;
    
    span {
      margin-left: 4px;
      color: #9ca3af;
    }
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