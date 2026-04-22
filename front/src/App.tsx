import { useState } from 'react'
import KoreaMap from './KoreaMap'
import Login from './pages/Auth/Login'
import Join from './pages/Auth/Join'
import Layout from './components/layout/Layout'

function App() {

  return (
    <>
      <Layout  hasHeader={true} title="여행지도" hasBottomNav={true} >
        <Join />
        <Login />
        <KoreaMap onRegionClick={(name) => alert(`You clicked on ${name}`)} />
      </Layout>
    </>
  )
}

export default App
