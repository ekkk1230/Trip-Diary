import styled from "styled-components";

export const SettingContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

export const GroupTitle = styled.h2`
  font-size: 14px;
  color: #888;
  margin: 24px 0 8px 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const SettingList = styled.div`
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #eee;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: #f0f0f0;
  }

  span {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }

  svg {
    color: #ccc;
    font-size: 20px;
  }

  &.danger {
    span {
      color: #ff4d4f;
    }
  }
`;

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #999;
`;