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

function App() {
    const navigate = useNavigate();
    const { title, setTitle } = useUiStore();
    const { resetMap } = useMapStore();

    const handleBackToMap = () => {
        resetMap();
        setTitle('지도');
        navigate('/');
    }

    return (
        <Routes>
            {/* 지도 페이지 */}
            <Route path="/" element={
                <Layout title={title} hasHeader hasBottomNav onBackClick={handleBackToMap}>
                    <MapPage />
                </Layout>
            } />
            <Route path="/detail/:contentid" element={
                <Layout title={title} hasHeader hasBottomNav onBackClick={handleBackToMap}>
                    <DetailPage />
                </Layout>
            } />
            
            <Route path="/journal" element={
                <Layout title={title} hasHeader hasBottomNav>
                    <JournalPage />
                </Layout>
            } />
            <Route path="/journal/write" element={
                <Layout title={title} hasHeader hasBottomNav>
                    <JournalDetailPage />
                </Layout>
            } />
            <Route path="/journal/edit/:id" element={
                <Layout title={title} hasHeader hasBottomNav>
                    <JournalDetailPage />
                </Layout>
            } />
            <Route path="/journal/:id" element={
                <Layout title={title} hasHeader hasBottomNav>
                    <JournalDetailPage />
                </Layout>
            } />

            <Route path="/mypage" element={
                <Layout title={title} hasHeader hasBottomNav>
                    <MyPage />
                </Layout>
            } />
            <Route path="/mypage/favorite" element={
                <Layout title={title} hasHeader hasBottomNav>
                    <FavoritePage />
                </Layout>
            } />
            
            {/* 로그인 페이지 */}
            <Route path="/login" element={
                <Layout title={title} hasHeader>
                    <Login />
                </Layout>
            } />
            <Route path="/join" element={
                <Layout title={title} hasHeader>
                    <Join />
                </Layout>
            } />
        </Routes>
    )
}

export default App
