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

    const [profileImg, setProfileImg] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nickname: '',
        userId: '',
        password: '',
        passwordConfirm: '',
        gender: 'male',
        birth: '',
        profileImg: '',
        agreements: {
            service: false,
            privacy: false,
            agreedAt: '',
        }
    });
    const [terms, setTerms] = useState({
        service: false,
        privacy: false,
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setProfileImg(base64String);

                setFormData(prev => ({
                    ...prev,
                    profileImg: base64String
                }))
            };
            reader.readAsDataURL(file);
        }
    }

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
            birth: formData.birth,
            profileImg: formData.profileImg || '',
            agreements: {
                service: terms.service,
                privacy: terms.privacy,
                agreedAt: new Date().toISOString().split('T')[0],
            }
        };

        joinUser(user);

        openModal(
            "check",
            "회원가입 완료",
            (<TextModal txt={"회원가입이 완료되었습니다."} />)
        );

        navigate('/login');
    }

    const handleAllTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setTerms({ service: checked, privacy: checked });
    }

    const handleTermClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setTerms(prev => ({ ...prev, [name]: checked }));
    }

    return (
        <>
            <S.Logo src={Logo} alt="Trip Diary" />
            <S.AuthTit className="auth_txt">여행의 순간을 기록하고 공유하세요.</S.AuthTit>

            <S.AuthBox className="auth_box">
               <form onSubmit={(e) => e.preventDefault()}>
                    <S.ProfileUploadSection>
                        <p className="auth_label_tit">프로필 사진</p>
                        <label htmlFor="profile-upload" className="profile_label">
                            <div className="img_preview">
                                {profileImg ? (
                                    <img src={profileImg} alt="Preview" />
                                ) : (
                                    <div className="placeholder">+</div>
                                )}
                            </div>
                        </label>
                        <input 
                            id="profile-upload" 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            style={{ display: 'none' }} 
                        />
                    </S.ProfileUploadSection>

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

                <S.TermsSection>
                    <div className="all_check">
                        <input 
                            type="checkbox" 
                            id="all-check" 
                            onChange={handleAllTerms}
                            checked={terms.service && terms.privacy}
                        />
                        <label htmlFor="all-check">약관 전체 동의</label>
                    </div>
                    <hr />
                    <div className="term_item">
                        <input 
                            type="checkbox" 
                            name="service" 
                            checked={terms.service} 
                            onChange={handleTermClick} 
                        />
                        <span>(필수) 이용약관 동의</span>
                    </div>
                    <div className="term_item">
                        <input 
                            type="checkbox" 
                            name="privacy" 
                            checked={terms.privacy} 
                            onChange={handleTermClick} 
                        />
                        <span>(필수) 개인정보 수집 및 이용 동의</span>
                    </div>
                </S.TermsSection>

                <button className="auth_btn" onClick={handleJoin}>회원가입</button>
            </S.AuthBox>
            
            <S.LoginLink to="/login">이미 계정이 있으신가요? 로그인</S.LoginLink>
        </>
    )
}

export default Join