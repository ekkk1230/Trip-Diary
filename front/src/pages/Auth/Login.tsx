import * as S from './Auth.styles'
import { useState } from 'react';
import Logo from "../../assets/Trip_Diary.png";
import { LiaUserSolid } from "react-icons/lia";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function Login() {
    const [eye, setEye] = useState(false);

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
                            <input type="text" placeholder="아이디를 입력하세요." />
                        </div>
                    </label>
                    <label htmlFor="" className="auth_label">
                        <p>비밀번호</p>
                        <div className="input_wrapper">
                            <RiLockPasswordFill/>
                            <input type={eye ? "text" : "password"} placeholder="비밀번호를 입력하세요." />
                            <button type="button" onClick={() => setEye(!eye)}>
                                {eye ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </label>
                </form>

                <S.LoginLink to="#">비밀번호를 잊으셨나요?</S.LoginLink>

                <button className="auth_btn">로그인</button>
            </S.AuthBox>
            
            <S.LoginLink to="#">아직 계정이 없으신가요? 회원가입</S.LoginLink>
        </>
    )
}

export default Login