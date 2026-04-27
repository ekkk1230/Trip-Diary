import styled, { keyframes } from "styled-components";

export const ListContainer = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

export const Card = styled.div`
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

export const CardBody = styled.div`
  padding: 12px;
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

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SpinnerWrap = styled.div`
    text-align: center;
    margin-top: 20px;
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