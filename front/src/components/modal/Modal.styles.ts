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
  width: auto;
  min-width: 320px;
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


  .btn-cancel {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    color: #868e96;
  }

  .btn-confirm {
    background-color: #26a69a;
    border: none;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(38, 166, 154, 0.2);
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
    background-color: ${props => (props.$active ? "#34C759" : "#E9E9EA")}; 
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
        left: ${props => (props.$active ? "24px" : "2px")}; 
        transition: left 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`;

export const Text = styled.div`
    font-size: 1.6rem; text-align: center;
`;

export const AddressSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: fadeIn 0.3s ease-out;

  /* 상단 뒤로가기 버튼 영역 */
  button {
    align-self: flex-start;
    padding: 8px 16px;
    background-color: #f1f3f5;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #495057;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
      background-color: #e9ecef;
    }

    &::before {
      content: '←'; /* 간단한 화살표 아이콘 대용 */
    }
  }

  /* 다음 주소 검색 컴포넌트가 들어가는 컨테이너 */
  .daum_postcode_container {
    width: 100%;
    height: 400px; /* 고정 높이를 주어 모달 안에서 스크롤되게 설정 */
    border: 1px solid #e9ecef;
    border-radius: 12px;
    overflow: hidden;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const AddressRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .zip_code_group {
    display: flex;
    gap: 8px;
    width: 60%; /* 우편번호는 짧으니까 조금 작게 */

    input {
      flex: 1;
      text-align: center;
      background-color: #f8f9fa; /* 읽기 전용 느낌 강조 */
    }
  }

  .main_address_group {
    input {
      width: 100%;
      background-color: #f8f9fa;
    }
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 50rem;
  gap: 24px;
  padding: 8px;
  max-height: 80vh;
  overflow-y: auto;

  /* 스크롤바 커스텀 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 10px;
  }
`;

export const PhotoSection = styled.div`
  .upload_box {
    width: 100%;
    height: 30rem;
    background-color: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
    position: relative;

    img { display: block; width: 100%; height: 100%; object-fit: cover; }
    .image_clear { position: absolute; top: .4rem; right: .4rem; background: none; font-size: 3.6rem; padding: 0; width: 4rem; height: 4rem; }

    label { 
      cursor: pointer;
      width: 100%; height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      background-color: #f1f3f5;
      border-color: #26a69a;
    }

    .icon {
      font-size: 32px;
      margin-bottom: 8px;
    }

    .label {
      font-size: 14px;
      color: #868e96;
      font-weight: 500;
    }

    .hidden_input {
      display: none;
    }
  }
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .input_row {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-size: 14px;
      font-weight: 700;
      color: #343a40;
      margin-left: 4px;
      text-align: left;
    }

    input[type="text"],
    input[type="tel"],
    textarea,
    select {
      padding: 12px 16px;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      font-size: 15px;
      background-color: #ffffff;
      transition: border-color 0.2s;
      width: 100%;

      &:focus {
        outline: none;
        border-color: #26a69a;
      }

      &::placeholder {
        color: #adb5bd;
      }
    }

    textarea {
      resize: none;
      line-height: 1.5;
    }
  }

  .category_group {
    display: grid;
    grid-template-columns: repeat(1fr);
    gap: 10px;

    label {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px;
      border: 1px solid #e9ecef;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;

      &:has(input:checked) {
        background-color: #e8f4f2;
        border-color: #26a69a;
        color: #26a69a;
      }

      input {
        accent-color: #26a69a;
      }
    }
  }

  .address_group {
    display: flex;
    gap: 8px;

    input {
      flex: 1;
    }

    .addr_btn {
      padding: 0 16px;
      background-color: #f1f3f5;
      border: 1px solid #e9ecef;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      color: #495057;
      cursor: pointer;

      &:hover {
        background-color: #e9ecef;
      }
    }
  }
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
  padding-bottom: 10px;

  button {
    flex: 1;
    padding: 16px;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.1s;

    &:active {
      transform: scale(0.98);
    }
  }
`;