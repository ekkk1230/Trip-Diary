import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import KoreaMap from './KoreaMap'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
      <KoreaMap onRegionClick={(name) => alert(`You clicked on ${name}`)} />
    </>
  )
}

export default App
