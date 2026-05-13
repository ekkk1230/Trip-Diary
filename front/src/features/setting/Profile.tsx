import { useState, type ChangeEvent } from 'react';
import PasswordChangeForm from '../../components/modal/modalContentLayout/PasswordChangeForm';
import ProfileImageChangeForm from '../../components/modal/modalContentLayout/ProfileImageChangeForm';
import { useUiStore } from '../../store/useUiStore';
import { useUserStore } from '../../store/useUserStore';
import * as S from './Setting.styles';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { openModal, closeModal } = useUiStore();
    const { user, profileDetailChange, passwordChage } = useUserStore();
    const navigate = useNavigate();

    const [profileForm, setProfileForm] = useState({
        nickname: user?.nickname || '',
        gender: user?.gender || '', 
        birth: user?.birth || '',
        profileImg: user?.profileImg || ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    // 1. 사진 변경 핸들러
    const handleImageChange = () => {
        openModal(
            "confirm", 
            "프로필 사진 변경", 
            (
                <ProfileImageChangeForm 
                    onImageChange={(file) => {
                        const previewUrl = URL.createObjectURL(file);
                        setProfileForm(prev => ({
                            ...prev,
                            profileImg: previewUrl
                        }));
                        closeModal();
                    }} 
                />
            )
        );
    };

    // 2. 비밀번호 변경 핸들러
    const handlePasswordChange = () => {
        openModal(
            'confirm', 
            '비밀번호 변경', 
            (
                <PasswordChangeForm 
                    onConfirm={(newPw) => {
                        console.log("변경할 비번:", newPw);
                        passwordChage(user?.userId!, newPw);
                        closeModal();
                    }} 
                />
            )
        );
    };

    const handleProfileSave = (userId: string | undefined) => {
        if (!userId) return;
        profileDetailChange(userId, profileForm);
        alert('저장 완료')
    };

    return (
        <S.ProfileContainer>
            {/* 상단 프로필 이미지 */}
            <S.ImageSection>
                <div className='profile-img'>
                    <img src={profileForm.profileImg} alt="" />
                </div>
                <button onClick={handleImageChange}>사진 변경</button>
            </S.ImageSection>

            {/* 유저 정보 리스트 */}
            <S.InfoSection>
                <div className="info-item">
                    <label>닉네임</label>
                    <input type="text" name="nickname" placeholder="닉네임을 입력하세요" value={profileForm.nickname} className="value" onChange={handleChange} />
                </div>
                <div className="info-item">
                <label>성별</label>
                    <select name="gender" className="value" value={profileForm.gender} onChange={handleChange}>
                        <option value="">선택 안 함</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>
                <div className="info-item">
                    <label>생년월일</label>
                    <input type="date" name="birth" className="value" value={profileForm.birth} onChange={handleChange} />
                </div>
            </S.InfoSection>

            {/* 하단 액션 버튼 */}
            <S.ActionSection>
                <button className="pw-change-btn" onClick={handlePasswordChange}>비밀번호 변경</button>
                <button className="save-btn" onClick={() => handleProfileSave(user?.userId)}>저장하기</button>
            </S.ActionSection>
        </S.ProfileContainer>
    );
}

export default Profile;