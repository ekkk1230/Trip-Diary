import { Routes, Route, useNavigate } from 'react-router-dom';
import { useMapStore } from './store/useMapStore';
import Login from './pages/auth/Login'
import Join from './pages/auth/Join'
import Layout from './components/layout/Layout'
import MapPage from './pages/map/MapPage';
import JournalPage from './pages/journal/JournalPage';
import { useUiStore } from './store/useUiStore';
import JournalDetailPage from './pages/journal/JournalDetailPage';
import MyPage from './pages/myPage/MyPage';
import FavoritePage from './pages/myPage/FavoritePage';
import DetailPage from './pages/map/DetailPage';
import SettingPage from './pages/setting/SettingPage';
import Profile from './features/setting/Profile';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import FindUser from './pages/auth/FindUser';
import { useUserStore } from './store/useUserStore';
import MySpot from './pages/myPage/MySpot';
import MyPlanner from './components/map/MyPlanner';

function App() {
    const { user } = useUserStore();
    const { title, setTitle, isDark } = useUiStore();
    const theme = isDark ? darkTheme : lightTheme;
    const { resetMap } = useMapStore();
    const navigate = useNavigate();

    const handleBackToMap = () => {
        resetMap();
        setTitle('지도');
        navigate('/');
    };

    const handleBackToJournal = () => {
        navigate('/journal');
    }

    if (!user) {
        return (
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Routes>
                    <Route path="/login" element={<Layout><Login /></Layout>} />
                    <Route path="/join" element={<Layout title="회원가입" hasHeader><Join /></Layout>} />
                    <Route path="/findUser" element={<Layout title="아이디/비밀번호 찾기" hasHeader><FindUser /></Layout>} />
                    <Route path="*" element={<Layout><Login /></Layout>} />
                </Routes>
            </ThemeProvider>
        );
    }
    

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Routes>
                {/* 지도 페이지 */}
                <Route path="/" element={
                    <Layout title={title} hasHeader hasBottomNav onBackClick={handleBackToMap}>
                        <MapPage />
                    </Layout>
                } />
                <Route path="/detail/:contentid" element={
                    <Layout title="상세보기" hasHeader hasBottomNav onBackClick={handleBackToMap}>
                        <DetailPage />
                    </Layout>
                } />
                
                <Route path="/journal" element={
                    <Layout title="저널" hasHeader hasBottomNav>
                        <JournalPage />
                    </Layout>
                } />
                <Route path="/journal/write" element={
                    <Layout title="저널" hasHeader hasBottomNav>
                        <JournalDetailPage />
                    </Layout>
                } />
                <Route path="/journal/edit/:id" element={
                    <Layout title="저널" hasHeader hasBottomNav>
                        <JournalDetailPage />
                    </Layout>
                } />
                <Route path="/journal/:id" element={
                    <Layout title="저널" hasHeader hasBottomNav onBackClick={handleBackToJournal}>
                        <JournalDetailPage />
                    </Layout>
                } />

                <Route path="/myplan" element={
                    <Layout title="" hasHeader hasBottomNav>
                        <MyPlanner />
                    </Layout>
                } />

                <Route path="/mypage" element={
                    <Layout title="마이페이지" hasHeader hasBottomNav>
                        <MyPage />
                    </Layout>
                } />
                <Route path="/mypage/myspot" element={
                    <Layout title="나만의 장소" hasHeader hasBottomNav onBackClick={() => navigate('/mypage')}>
                        <MySpot />
                    </Layout>
                } />
                <Route path="/mypage/myspot/:contentid" element={
                    <Layout title="나만의 장소" hasHeader hasBottomNav onBackClick={() => navigate('/mypage')}>
                        <DetailPage />
                    </Layout>
                } />
                <Route path="/mypage/favorite" element={
                    <Layout title="찜목록" hasHeader hasBottomNav onBackClick={() => navigate('/mypage')}>
                        <FavoritePage />
                    </Layout>
                } />
                <Route path="/mypage/favorite/:contentid" element={
                    <Layout title="찜목록" hasHeader hasBottomNav onBackClick={() => navigate('/mypage')}>
                        <DetailPage />
                    </Layout>
                } />

                <Route path="/settings" element={
                    <Layout title="설정" hasHeader hasBottomNav>
                        <SettingPage />
                    </Layout>
                } />
                <Route path="/settings/profile" element={
                    <Layout title="프로필 수정" hasHeader hasBottomNav>
                        <Profile />
                    </Layout>
                } />
            </Routes>
        </ThemeProvider>
    )
}

export default App
