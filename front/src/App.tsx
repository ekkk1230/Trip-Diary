import { Routes, Route } from 'react-router-dom';
import { useMapStore } from './store/useMapStore';
import Login from './pages/auth/Login'
import Join from './pages/auth/Join'
import Layout from './components/layout/Layout'
import MapPage from './pages/map/MapPage';
import DetailPage from './pages/detail/DetailPage';
import JournalPage from './pages/journal/JournalPage';
import { useUiStore } from './store/useUiStore';
import JournalDetail from './features/journal/JournalDetail';
import JournalDetailPage from './pages/journal/JournalDetailPage';

function App() {
  const { title } = useUiStore();

  return (
    <Routes>
    {/* 지도 페이지 */}
    <Route path="/" element={
        <Layout title={title} hasHeader hasBottomNav onBackClick={() => useMapStore.getState().resetMap() }>
            <MapPage />
        </Layout>
    } />
    <Route path="/detail/:contentid" element={
        <Layout title={title} hasHeader hasBottomNav onBackClick={() => useMapStore.getState().resetMap() }>
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
    <Route path="/journal/edit/:journalId" element={
        <Layout title={title} hasHeader hasBottomNav>
            <JournalDetailPage />
        </Layout>
    } />
    <Route path="/journal/:journalId" element={
        <Layout title={title} hasHeader hasBottomNav>
            <JournalDetailPage />
        </Layout>
    } />
    
    {/* 로그인 페이지 */}
    <Route path="/login" element={
        <Layout title={title} hasHeader>
            <Login />
        </Layout>
    } />
  </Routes>
  )
}

export default App
