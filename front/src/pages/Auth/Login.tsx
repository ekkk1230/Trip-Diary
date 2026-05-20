import * as S from './Auth.styles'
import { useState, type ChangeEvent } from 'react';
import Logo from "../../assets/Trip_Diary.png";
import { LiaUserSolid } from "react-icons/lia";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { useUiStore } from '../../store/useUiStore';
import TextModal from '../../components/modal/modalContentLayout/TextModal';

function Login() {    
    const { login } = useUserStore();
    const { openModal } = useUiStore();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        userId: '',
        password: '',
    })
    const [eye, setEye] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setLoginData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleLogin = async () => {
        const isSuccess = login(loginData);
        
        if (await isSuccess) {
            navigate('/');
        } else {
            openModal(
                "check",
                "로그인 실패",
                (<TextModal txt={"아이디 또는 비밀번호를 다시 입력해주세요."} />)
            )
        }
    }
    
    return (
        <>
            <S.Logo src={Logo} alt="Trip Diary" />
            <S.AuthTit className="auth_txt">여행의 순간을 기록하고 공유하세요.</S.AuthTit>

            <S.AuthBox className="auth_box">
                <p className="auth_tit">로그인</p>

                <form action="">
                    <label htmlFor="" className="auth_label">
                        <p>아이디</p>
                        <div className="input_wrapper">
                            <LiaUserSolid />
                            <input type="text" name="userId" placeholder="아이디를 입력하세요." onChange={handleChange} />
                        </div>
                    </label>
                    <label htmlFor="" className="auth_label">
                        <p>비밀번호</p>
                        <div className="input_wrapper">
                            <RiLockPasswordFill/>
                            <input type={eye ? "text" : "password"} name="password" placeholder="비밀번호를 입력하세요." onChange={handleChange} />
                            <button type="button" onClick={() => setEye(!eye)}>
                                {eye ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </label>
                </form>

                <S.LoginLink to="/findUser">아이디/비밀번호를 잊으셨나요?</S.LoginLink>

                <button className="auth_btn" onClick={() => handleLogin()}>로그인</button>
            </S.AuthBox>
            
            <S.LoginLink to="/join">아직 계정이 없으신가요? 회원가입</S.LoginLink>
        </>
    )
}

export default Login