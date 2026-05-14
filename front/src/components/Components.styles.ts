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