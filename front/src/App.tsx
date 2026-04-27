import { Routes, Route } from 'react-router-dom';
import { useMapStore } from './store/useMapStore';
import MapComponent from './components/MapComponent'
import Login from './pages/Auth/Login'
import Join from './pages/Auth/Join'
import Layout from './components/layout/Layout'

function App() {
  const { title } = useMapStore();

  return (
    <Routes>
    {/* 지도 페이지 */}
    <Route path="/" element={
        <Layout title={title} hasHeader hasBottomNav onBackClick={() => useMapStore.getState().resetMap() }>
            <MapComponent />
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
