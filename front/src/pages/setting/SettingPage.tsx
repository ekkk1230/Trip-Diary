import { useNavigate } from 'react-router-dom';
import * as S from '../../features/setting/Setting.styles';
import { MdChevronRight } from 'react-icons/md';
import { useUiStore } from '../../store/useUiStore';
import SetDarkOptionForm from '../../components/modal/modalContentLayout/ToggleForm';
import { useUserStore } from '../../store/useUserStore';
import TextModal from '../../components/modal/modalContentLayout/TextModal';

function SettingPage() {
    const { openModal, isDark, alarm, closeModal } = useUiStore();
    const { user, clearUser, removeUser } = useUserStore();
    const navigate = useNavigate();

    const handleSetting = () => {
        openModal(
            "check",
            "다크 모드 변경",
            (
                <SetDarkOptionForm subTit={"다크 모드 적용"} subLabel={"화면을 어둡게 설정하여 눈을 보호합니다."} type={"setting"} />
            )
        )
    }

    const handleAlarm = () => {
        openModal(
            "check",
            "알림 설정 변경",
            (
                <SetDarkOptionForm subTit={"알람 설정 적용"} subLabel={"중요한 소식과 업데이트에 대한 푸시 알림을 설정합니다."} type={"alarm"}  />
            )
        )
    }

    const handleRemoveUser = () => {
        openModal(
            "confirm",
            "회원 탈퇴",
            <TextModal 
            txt={"정말로 회원탈퇴를 하시겠습니까? 삭제 후 복구가 불가능합니다."} 
            onConfirm={() => {
                removeUser(user!);
                closeModal();
                navigate('/login');
            }} />
        )
    };

    const handleLogout = () => {
        clearUser();
        navigate('/login');
    }

    return (
        <S.SettingContainer>
            {/* 계정 섹션 */}
            <S.GroupTitle>계정</S.GroupTitle>
            <S.SettingList>
                <S.SettingItem onClick={() => navigate('/settings/profile')}>
                    <span>프로필 수정</span>
                    <MdChevronRight />
                </S.SettingItem>
                <S.SettingItem onClick={handleLogout}>
                    <span>로그아웃</span>
                    <MdChevronRight />
                </S.SettingItem>
            </S.SettingList>

            {/* 앱 설정 섹션 */}
            <S.GroupTitle>앱 설정</S.GroupTitle>
            <S.SettingList>
                <S.SettingItem onClick={handleSetting}>
                    <span>다크 모드</span>
                    <S.ToggleWrapper>
                        {isDark ? ("활성화") : ("비활성화")}
                        <MdChevronRight />
                    </S.ToggleWrapper>
                </S.SettingItem>
                <S.SettingItem onClick={handleAlarm}>
                    <span>알림 설정</span>
                    <S.ToggleWrapper>
                        {alarm ? ("활성화") : ("비활성화")}
                        <MdChevronRight />
                    </S.ToggleWrapper>
                </S.SettingItem>
            </S.SettingList>

            {/* 기타 섹션 */}
            <S.GroupTitle>기타</S.GroupTitle>
            <S.SettingList>
                <S.SettingItem>
                    <span>버전 정보</span>
                    <span style={{ fontSize: '14px', color: '#bbb' }}>v1.0.0</span>
                </S.SettingItem>
                <S.SettingItem className="danger" onClick={() => handleRemoveUser()}>
                    <span>회원 탈퇴</span>
                </S.SettingItem>
            </S.SettingList>
        </S.SettingContainer>
    );
}

export default SettingPage;