import { useNavigate } from 'react-router-dom';
import * as S from '../../features/setting/Setting.styles';
import { MdChevronRight } from 'react-icons/md';

function SettingPage() {
    const navigate = useNavigate();

    return (
        <S.SettingContainer>
            {/* 계정 섹션 */}
            <S.GroupTitle>계정</S.GroupTitle>
            <S.SettingList>
                <S.SettingItem onClick={() => navigate('/settings/profile')}>
                    <span>프로필 수정</span>
                    <MdChevronRight />
                </S.SettingItem>
                <S.SettingItem onClick={() => alert('준비 중인 기능입니다.')}>
                    <span>로그아웃</span>
                    <MdChevronRight />
                </S.SettingItem>
            </S.SettingList>

            {/* 앱 설정 섹션 */}
            <S.GroupTitle>앱 설정</S.GroupTitle>
            <S.SettingList>
                <S.SettingItem>
                    <span>다크 모드</span>
                    <S.ToggleWrapper>
                        현재 끔
                        <MdChevronRight />
                    </S.ToggleWrapper>
                </S.SettingItem>
                <S.SettingItem>
                    <span>알림 설정</span>
                    <MdChevronRight />
                </S.SettingItem>
            </S.SettingList>

            {/* 기타 섹션 */}
            <S.GroupTitle>기타</S.GroupTitle>
            <S.SettingList>
                <S.SettingItem>
                    <span>버전 정보</span>
                    <span style={{ fontSize: '14px', color: '#bbb' }}>v1.0.0</span>
                </S.SettingItem>
                <S.SettingItem className="danger" onClick={() => confirm('정말 탈퇴하시겠습니까?')}>
                    <span>회원 탈퇴</span>
                </S.SettingItem>
            </S.SettingList>
        </S.SettingContainer>
    );
}

export default SettingPage;