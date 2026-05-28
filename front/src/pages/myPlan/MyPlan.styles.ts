import { Link } from "react-router-dom";
import { styled } from "styled-components";

/* ============================================================== */
/* =========================  리스트 ============================== */
/* ============================================================== */
export const PlanWrap = styled.div`
    width: 100%; position: relative;

    > .linkBtn { display: inline-block; margin-left: auto; }
`;

export const LinkBtn = styled(Link)`
    display: block; padding: 1rem 1.2rem; border-radius: .8rem; background: #105e4c; color: #fff; font-weight: 500; font-size: 1.4rem; text-align: center;
`;

export const PlanList = styled.ul`
    display: flex; flex-flow: row wrap; gap: 1rem;
    margin-top: 5rem;

    li { 
        width: 100%; border-radius: .8rem; 
        box-shadow: 0 .4rem 2rem rgba(0, 0, 0, 0.05); 
        background: #fff; 
        position: relative; transition: all .3s ease-in-out; top: 0;
        
        &:hover { 
            top: -.4rem; 
            box-shadow: 0 .8rem 2.4rem rgba(0, 0, 0, 0.1);
        }

        > a { 
            display: block; 
            padding: 1.6rem; 
            color: inherit; 
            text-decoration: none; 
        }
    }

    .item-date { font-size: 1.2rem; color: #777; margin-bottom: .6rem; }
    
    .item-tit { 
        color: #111; font-size: 1.5rem; font-weight: 600; 
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; 
    }
`;

export const NoPlane = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    min-height: 35rem; 
    padding: 4rem 2rem;
    border-radius: 1.2rem;
    background: #fdfdfd;
    border: 1px dashed #e0e0e0;
    text-align: center;

    .no-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: #222;
        margin-bottom: .8rem;
    }

    .no-desc {
        font-size: 1.4rem;
        color: #888;
        margin-bottom: 2.4rem;
    }

    > a {
        display: inline-block;
        min-width: 18rem;
    }
`;

/* ============================================================== */
/* =========================  상세  ============================== */
/* ============================================================== */


export const ViewWrap = styled.div`
    width: 100%;
    max-width: 120rem;
    margin: 0 auto;
    padding: 2rem;
    box-sizing: border-box;
`;

export const ViewHeader = styled.div`
    border-bottom: 1px solid #eee;
    padding-bottom: 2.4rem;
    margin-bottom: 3rem;
    position: relative;

    .view-date {
        font-size: 1.4rem;
        color: #777;
        font-weight: 500;
        margin-bottom: .8rem;
    }

    .view-title {
        font-size: 2.8rem;
        font-weight: 700;
        color: #111;
        margin-bottom: 1.2rem;
        line-height: 1.3;
    }

    .view-memo {
        font-size: 1.5rem;
        color: #555;
        line-height: 1.6;
        background: #f8f9fa;
        padding: 1.2rem 1.6rem;
        border-radius: .8rem;
        border-left: .4rem solid #105e4c;
        margin-top: 1.6rem;
    }

    .btn-group {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        gap: .8rem;

        button {
            padding: .8rem 1.6rem;
            border-radius: .6rem;
            font-size: 1.4rem;
            font-weight: 500;
            cursor: pointer;
            transition: all .2s;
            border: 1px solid #ddd;
            background: #fff;
            color: #666;

            &:hover {
                background: #f5f5f5;
            }

            &.btn-delete {
                border-color: #ff4d4f;
                color: #ff4d4f;

                &:hover {
                    background: #fff2f0;
                }
            }
        }
    }

    @media (max-width: 768px) {
        padding-bottom: 1.6rem;
        
        .view-title { font-size: 2.2rem; }
        .btn-group { 
            position: relative; 
            margin-top: 1.6rem; 
            justify-content: flex-end; 
        }
    }
`;

export const ViewContent = styled.div`
    display: flex;
    gap: 4rem;
    align-items: flex-start;

    @media (max-width: 1024px) {
        flex-direction: column-reverse; 
        gap: 2.4rem;
    }
`;

export const TimelineSection = styled.section`
    flex: 1;
    width: 100%;

    h3 {
        font-size: 1.8rem;
        font-weight: 600;
        color: #222;
        margin-bottom: 2rem;
    }

    .timeline-list {
        list-style: none;
        padding: 0;
        margin: 0;
        padding-left: 2rem; 
        position: relative;

        &::before {
            content: '';
            position: absolute;
            left: .7rem;
            top: 1.5rem;
            bottom: 1.5rem;
            width: .2rem;
            border-left: 2px dashed #ddd;
        }
    }

    .timeline-item {
        position: relative;
        display: flex;
        align-items: center;
        gap: 1.6rem;
        background: #fff;
        padding: 1.6rem;
        border-radius: 1.2rem;
        box-shadow: 0 .4rem 1.2rem rgba(0,0,0,0.03);
        border: 1px solid #f0f0f0;
        margin-bottom: 2rem;
        transition: transform .2s;

        &:hover {
            transform: translateX(.4rem);
            border-color: #105e4c;
        }

        &:last-child {
            margin-bottom: 0;
        }

        .order-number {
            position: absolute;
            left: -2.1rem; 
            top: 50%;
            transform: translateY(-50%);
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            background: #105e4c;
            color: #fff;
            font-size: 1.2rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            box-shadow: 0 0 0 .4rem #fff;
        }

        .place-info {
            flex: 1;
            min-width: 0;

            .place-name {
                font-size: 1.6rem;
                font-weight: 600;
                color: #111;
                margin-bottom: .4rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .place-addr {
                font-size: 1.3rem;
                color: #777;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .place-thumb {
            width: 7rem;
            height: 7rem;
            border-radius: .8rem;
            object-fit: cover;
            background: #eee;
        }
    }
`;

export const MapSection = styled.section`
    width: 45rem;
    position: sticky;
    top: 4rem; 
    
    @media (max-width: 1024px) {
        width: 100%;
        position: relative;
        top: 0;
    }

    .map-wrapper {
        width: 100%;
        height: 50rem;
        border-radius: 1.6rem;
        overflow: hidden;
        box-shadow: 0 .8rem 2.4rem rgba(0,0,0,0.06);
        border: 1px solid #e8e8e8;
        background: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
        color: #999;

        @media (max-width: 1024px) {
            height: 35rem;
        }
    }
`;

/* ============================================================== */
/* =========================  수정  ============================== */
/* ============================================================== */
export const PlannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1280px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;



export const PlannerHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

export const HeaderTopRows = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 20px;
  width: 100%;

  @media (max-width: 968px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.title-input { flex-grow: 2; }
  &.date-input { flex-grow: 1; }
  
  &.memo-input {
    width: 100%;
    margin-top: 4px;
  }

  label {
    font-size: 1.4rem;
    font-weight: 700;
    color: #475569;
    letter-spacing: 0.5px;
  }

  input[type="text"] {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    font-size: 1rem;
    font-weight: 500;
    &:focus { border-color: #105e4c; outline: none; }
  }

  textarea {
    width: 100%;
    min-height: 10rem; 
    padding: 14px 16px;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
    font-size: 1.4rem;
    font-weight: 500;
    color: #1e293b;
    line-height: 1.5;
    resize: none;
    font-family: inherit;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: #105e4c;
      box-shadow: 0 0 0 3px rgba(16, 94, 76, 0.1);
    }

    &::placeholder {
      color: #94a3b8;
    }
  }
`;

export const SaveButton = styled.button`
  padding: 12px 28px;
  height: 48px;
  background-color: #105e4c;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(16, 94, 76, 0.2);
  white-space: nowrap;

  &:hover {
    background-color: #0d4b3d;
    box-shadow: 0 4px 12px -1px rgba(16, 94, 76, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 8px;
  }
`;

export const TopSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2.4rem;
  min-height: 52rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

export const PlaceStorage = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 1.6rem;
  border: .1rem solid #e2e8f0;
  box-shadow: 0 .4rem .6rem -.1rem rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const StorageHeader = styled.div`
  padding: 2rem;
  border-bottom: 1rem solid #f1f5f9;
  background: #fafafa;

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 14px 0;
  }
`;

export const CategoryTabs = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
`;

export const CategoryTab = styled.button<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.$active ? '#105e4c' : '#e2e8f0'};
  background-color: ${props => props.$active ? '#105e4c' : '#ffffff'};
  color: ${props => props.$active ? '#ffffff' : '#64748b'};

  &:hover {
    background-color: ${props => props.$active ? '#105e4c' : '#f1f5f9'};
    color: ${props => props.$active ? '#ffffff' : '#1e293b'};
  }
`;

export const StorageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  overflow-y: auto;
  max-height: 420px;
`;

export const StorageItemButton = styled.button<{ $active: boolean }>`
  width: 100%;
  padding: 14px 18px;
  text-align: left;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.$active ? '#e2e8f0' : '#e2e8f0'};
  background-color: ${props => props.$active ? '#f0fdf4' : '#ffffff'};
  color: ${props => props.$active ? '#166534' : '#334155'};
  position: relative;

  &:hover {
    border-color: ${props => props.$active ? '#bbf7d0' : '#cbd5e1'};
    background-color: ${props => props.$active ? '#f0fdf4' : '#f8fafc'};
  }

  &::after {
    content: '+';
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    font-weight: bold;
    color: ${props => props.$active ? '#166534' : '#94a3b8'};
    display: ${props => props.$active ? 'none' : 'block'};
  }
`;

export const SchedulePanel = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const ScheduleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f1f5f9;

  h3 {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
`;

export const DayTabWrapper = styled.div`
  display: flex;
  gap: 4px;
  padding: 0 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const DayTabButton = styled.button<{ $isActive: boolean }>`
  padding: 14px 20px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  background: transparent;
  border: none;
  position: relative;
  transition: all 0.2s ease;
  color: ${props => props.$isActive ? '#105e4c' : '#94a3b8'};

  &:hover {
    color: ${props => props.$isActive ? '#105e4c' : '#475569'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: #105e4c;
    border-radius: 3px 3px 0 0;
    transform: scaleX(${props => props.$isActive ? 1 : 0});
    transition: transform 0.2s ease;
  }
`;

export const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #ef4444;
  background-color: #fef2f2;
  border: 1px solid #fee2e2;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #fee2e2;
  }
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
  max-height: 440px;
  background-color: #fafafa;
  flex-grow: 1;
`;

export const DraggableItem = styled.div<{ $isDragging: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid ${props => props.$isDragging ? '#3b82f6' : '#e2e8f0'};
  box-shadow: ${props => props.$isDragging ? '0 10px 15px -3px rgba(59, 130, 246, 0.2)' : '0 1px 3px rgba(0,0,0,0.02)'};
  transition: border-color 0.2s, box-shadow 0.2s;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const IndexBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 26px;
  height: 26px;
  background-color: #2563eb;
  color: #ffffff;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
`;

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;

  strong {
    font-size: 1rem;
    font-weight: 600;
    color: #1e293b;
  }

  span {
    font-size: 0.85rem;
    color: #64748b;
  }
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f5f9;
    color: #ef4444;
  }
`;


export const TravelInfoTag = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 12px 0 12px 28px;

  .line {
    position: absolute;
    left: 12px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-image: linear-gradient(to bottom, #cbd5e1 50%, rgba(255,255,255,0) 0%);
    background-position: right;
    background-size: 2px 8px;
    background-repeat: repeat-y;
  }

  .info {
    font-size: 0.8rem;
    font-weight: 600;
    color: #0284c7;
    background-color: #e0f2fe;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid #bae6fd;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    span {
      color: #0369a1;
      font-weight: 400;
    }
  }
`;

export const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  padding: 20px;
  gap: 16px;
`;

export const MapCategoryNav = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const MapCategoryBtn = styled.button<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.$active ? '#ea580c' : '#e2e8f0'};
  background-color: ${props => props.$active ? '#ffedd5' : '#ffffff'};
  color: ${props => props.$active ? '#ea580c' : '#475569'};

  &:hover {
    border-color: ${props => props.$active ? '#ea580c' : '#cbd5e1'};
    background-color: ${props => props.$active ? '#ffedd5' : '#f8fafc'};
  }
`;