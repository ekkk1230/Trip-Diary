import { useState } from 'react'
import KoreaMap from './KoreaMap'
import Login from './pages/Auth/Login'

function App() {

  return (
    <>
      <Login />
      <KoreaMap onRegionClick={(name) => alert(`You clicked on ${name}`)} />
    </>
  )
}

export default App
