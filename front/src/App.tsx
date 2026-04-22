import { useState } from 'react'
import KoreaMap from './KoreaMap'
import Login from './pages/Auth/Login'
import Join from './pages/Auth/Join'

function App() {

  return (
    <>
      <Join />
      <Login />
      <KoreaMap onRegionClick={(name) => alert(`You clicked on ${name}`)} />
    </>
  )
}

export default App
