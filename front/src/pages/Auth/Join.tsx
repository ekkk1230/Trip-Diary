import * as S from './Auth.styles'
import Logo from "../../assets/Trip_Diary_row.png";
import { useUserStore } from '../../store/useUserStore';
import React, { useState, type ChangeEvent } from 'react';
import { useUiStore } from '../../store/useUiStore';
import TextModal from '../../components/modal/modalContentLayout/TextModal';
import { useNavigate } from 'react-router-dom';

function Join() {
    const { openModal } = useUiStore();
    const { joinUser } = useUserStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nickname: '',
        userId: '',
        password: '',
        passwordConfirm: '',
        gender: 'male',
        birth: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleJoin = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (formData.password !== formData.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const user = {
            id: crypto.randomUUID(),
            nickname: formData.nickname,
            userId: formData.userId,
            password: formData.password,
            gender: formData.gender,
            birth: formData.birth
        };

        joinUser(user);

        openModal(
            "check",
            "회원가입 완료",
            (<TextModal txt={"회원가입이 완료되었습니다."} />)
        );

        navigate('/login');
    }

    return (
        <>
            <S.Logo src={Logo} alt="Trip Diary" />
            <S.AuthTit className="auth_txt">여행의 순간을 기록하고 공유하세요.</S.AuthTit>

            <S.AuthBox className="auth_box">
                <p className="auth_tit">회원가입</p>

                <form onSubmit={(e) => e.preventDefault()}>
                    <label className="auth_label">
                        <p>닉네임</p>
                        <input name="nickname" type="text" placeholder="닉네임을 입력하세요." onChange={handleChange} />
                    </label>
                    <label className="auth_label">
                        <p>아이디</p>
                        <input name="userId" type="text" placeholder="아이디를 입력하세요." onChange={handleChange} />
                    </label>
                    <label className="auth_label">
                        <p>비밀번호</p>
                        <input name="password" type="password" placeholder="비밀번호를 입력하세요." onChange={handleChange} />
                    </label>
                    <label className="auth_label">
                        <p>비밀번호 확인</p>
                        <input name="passwordConfirm" type="password" placeholder="비밀번호를 다시 입력하세요." onChange={handleChange} />
                    </label>
                    <label className="auth_label">
                        <p>성별</p>
                        <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> 남
                        <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> 여
                    </label>
                    <label className="auth_label">
                        <p>생년월일</p>
                        <input name="birth" type="date" className="value" onChange={handleChange} />
                    </label>
                </form>

                <button className="auth_btn" onClick={handleJoin}>회원가입</button>
            </S.AuthBox>
            
            <S.LoginLink to="/login">이미 계정이 있으신가요? 로그인</S.LoginLink>
        </>
    )
}

export default Join