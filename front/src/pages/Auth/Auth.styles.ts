import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

export const Logo = styled.img`
    display: block;
    width: 16rem;
    margin: 2rem auto .2rem;
`;

export const AuthTit = styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    color: #1a3d35;
    text-align: center;
`;

export const AuthBox = styled.div`
    width: 40rem;
    border-radius: 2rem;
    background: #fff;
    margin: 4rem auto 2rem;
    padding: 2rem;

    .auth_tit { font-size: 1.6rem; margin-bottom: 2rem; }

    .auth_label { 
        display: flex; flex-flow: column; align-items: flex-start;
    
        .input_wrapper { 
            background: #f0f9f6; border: .1rem solid rgba(45, 125, 110, 0.12); padding: 1.2rem 1rem; border-radius: .8rem; width: 100%; outline: 0; display: flex; align-items: center; justify-content: space-between;

            svg { width: 1.6rem; min-width: 1.6rem; height: 1.6rem; margin-right: 1rem; }
            
            input { padding: 0; flex: 1; background: transparent; border: 0; font-size: 1.4rem; padding-left: 1.4rem; }
            button { 
                background: transparent; cursor: pointer; padding: 0;
                
                svg { margin: 0; }
            }
        }
        .input_wrapper:focus { border-color: #2d7d6e; }
    }
    .auth_label + .auth_label { margin-top: 1.2rem; }
    .auth_label p { font-size: 1.4rem; margin-bottom: 0.5rem; font-weight: 500; }
    .auth_label > input { background: #f0f9f6; width: 100%; outline: 0; }
    .auth_label input:focus { border-color: #2d7d6e; }
    .auth_label input::placeholder { color: #1a3d35 }

    .auth_btn { width: 100%; background: #2d7d6e; color: #fff; border: none; font-size: 1.4rem; cursor: pointer; display: block; margin-top: 1.2rem; }
`;

export const LoginLink = styled(Link)`
    display: block; text-align: right; margin: 1.2rem 0; font-size: 1.4rem; text-align: center;
     color: #666;  
    a { font-weight: 500; text-decoration: none; color: #1a3d35; }
`;

export const FindUserContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

// 탭 바깥 컨테이너 (회색 배경)
export const TabWrapper = styled.div`
  display: flex;
  background: #f1f1f1;
  padding: 4px;
  border-radius: 12px;
  margin-bottom: 30px;
  position: relative;
`;

// 개별 탭 버튼
export const TabButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  background-color: #fff;
  color: #888;
  box-shadow: ${(props) => 
    props.$isActive ? "0 2px 8px rgba(0,0,0,0.1)" : "none"
  };

  &:hover {
    color: ${(props) => props.$isActive ? "" : "#555"};
  }
`;

// 입력 폼 스타일
export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    font-size: 13px;
    font-weight: 600;
    color: #888;
  }

  input {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: #fff;
    font-size: 15px;

    &:focus {
      outline: none;
      border-color: #deff9a;
    }
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: none;
  background-color: #deff9a;
  color: #000;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    filter: brightness(0.9);
  }
`;