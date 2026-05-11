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

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

export const Input = styled.input`
    width: 100%; 
`;

export const PreviewSection = styled.div`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #f0f0f0;
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .placeholder {
        font-size: 12px;
        color: #999;
        text-align: center;
    }
`;

export const ModalFooter = styled.div`
  padding: 1.2rem 0 1.6rem;
  display: flex;
  gap: 8px;
  width: 100%;

  .btn-wrap { width: 100%; display: flex; gap: .8rem; }

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

export const OptionItem = styled.div`
    display: flex; flex-flow: column;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #f9f9f9;
    border-radius: 12px;

    .info {
        display: flex;
        flex-direction: column;
        gap: 4px; margin-bottom: 1.6rem;

        .label {
            font-size: 16px;
            font-weight: 600;
            color: #333;
        }

        .sub-label {
            font-size: 12px;
            color: #888;
        }
    }
`;

export const ToggleWrapper = styled.div<{ $active: boolean }>`
    width: 50px;
    height: 28px;
    background-color: ${props => (props.$active ? "#34C759" : "#E9E9EA")}; // iOS 그린 컬러
    border-radius: 15px;
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;

    .circle {
        width: 24px;
        height: 24px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: ${props => (props.$active ? "24px" : "2px")}; // 상태에 따른 이동
        transition: left 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`;

export const Text = styled.div`
    font-size: 1.6rem; text-align: center;
`;