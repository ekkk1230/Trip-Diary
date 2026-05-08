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

export const ProfileContainer = styled.div`
  padding: 40px 20px;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .profile-img {
    width: 100px;
    height: 100px;
    background-color: #eee;
    border-radius: 50%;
    background-image: url('https://via.placeholder.com/100'); // 임시 이미지
    background-size: cover;
    background-position: center;
    border: 2px solid #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    overflow: hidden;

    img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
  }

  button {
    background: none;
    border: none;
    color: #3498db;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
`;

export const InfoSection = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 15px;
  padding: 10px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);

  .info-item {
    padding: 15px 0;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child { border-bottom: none; }

    label {
      font-size: 14px;
      color: #888;
      width: 80px;
    }

    .value {
      font-size: 16px;
      color: #333;
      font-weight: 500;
      flex: 1;
      text-align: right;
    }

    input {
      border: none;
      text-align: right;
      font-size: 16px;
      font-weight: 500;
      color: #333;
      outline: none;
      width: 100%;
      &::placeholder { color: #ccc; }
    }
  }
`;

export const ActionSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  button {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .pw-change-btn {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #495057;
    &:active { background-color: #e9ecef; }
  }

  .save-btn {
    background-color: #333;
    border: none;
    color: #fff;
    &:active { background-color: #000; }
  }
`;