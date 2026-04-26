import { useMapStore } from './store/useMapStore';
import { useState } from 'react'
import MapComponent from './components/MapComponent'
import Login from './pages/Auth/Login'
import Join from './pages/Auth/Join'
import Layout from './components/layout/Layout'

function App() {
  const { title } = useMapStore();

  return (
    <>
      <Layout hasHeader={true} title={title} hasBottomNav={true} >
        {/* <Join />
        <Login /> */}
        <MapComponent />
      </Layout>
    </>
  )
}

export default App
