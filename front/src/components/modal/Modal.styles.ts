import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 320px;
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.2s ease-out;

  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;

  p {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }

  button {
    background: none;
    border: none;
    font-size: 24px;
    color: #999;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0;
    &:hover { color: #333; }
  }
`;

export const ModalBody = styled.div`
  padding: 24px 20px;
  font-size: 15px;
  color: #666;
  line-height: 1.5;
  text-align: center;
`;

export const ModalFooter = styled.div`
  padding: 12px 16px 16px;
  display: flex;
  gap: 8px;

  button {
    flex: 1;
    height: 48px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background 0.2s;
  }

  /* 확인/닫기 버튼 (Main) */
  .btn-confirm {
    background-color: #333;
    color: #fff;
    &:active { background-color: #000; }
  }

  /* 취소 버튼 (Sub) */
  .btn-cancel {
    background-color: #f1f1f1;
    color: #666;
    &:active { background-color: #e5e5e5; }
  }
`;