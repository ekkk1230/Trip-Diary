import PasswordChangeForm from '../../components/modal/modalContentLayout/PasswordChangeForm';
import ProfileImageChangeForm from '../../components/modal/modalContentLayout/ProfileImageChangeForm';
import { useSettingStore } from '../../store/useSettingStore';
import { useUiStore } from '../../store/useUiStore';
import * as S from './Setting.styles';

function Profile() {
    const { openModal } = useUiStore();

    const userInfo = {
        nickname: "테스트유저",
        email: "test@example.com",
        gender: "",
        birth: "1990-01-01",
        profileImg: "https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?auto=format&fit=crop&w=800&q=80"
    };

    const setPassword = (newPassword: string) => {
        console.log(`새 비밀번호: ${newPassword}`);
    }

    const handleImageChange = () => {
        openModal("confirm", "프로필 사진 변경", <ProfileImageChangeForm onImageChange={(newImage) => console.log(`새 프로필 사진: ${newImage}`)} />, () => {
            console.log('프로필 사진 변경 확인');
        });
    }

    const handlePasswordChange = () => {
        openModal('confirm', '비밀번호 변경', <PasswordChangeForm onChange={setPassword} />, () => {
            console.log('비밀번호 변경 확인');
        })
    }

    return (
        <S.ProfileContainer>
            {/* 상단 프로필 이미지 */}
            <S.ImageSection>
                <div className='profile-img'>
                    <img src={userInfo.profileImg} alt="" />
                </div>
                <button onClick={handleImageChange}>사진 변경</button>
            </S.ImageSection>

            {/* 유저 정보 리스트 */}
            <S.InfoSection>
                <div className="info-item">
                    <label>닉네임</label>
                    <input type="text" placeholder="닉네임을 입력하세요" value={userInfo.nickname} className="value" />
                </div>
                <div className="info-item">
                <label>성별</label>
                    <select className="value" value={userInfo.gender}>
                        <option value="">선택 안 함</option>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>
                <div className="info-item">
                    <label>생년월일</label>
                    <input type="date" className="value" value={userInfo.birth} />
                </div>
            </S.InfoSection>

            {/* 하단 액션 버튼 */}
            <S.ActionSection>
                <button className="pw-change-btn" onClick={handlePasswordChange}>비밀번호 변경</button>
                <button className="save-btn">저장하기</button>
            </S.ActionSection>
        </S.ProfileContainer>
    );
}

export default Profile;