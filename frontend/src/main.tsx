import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login/Login'
import Home from './Home/Home'
import Play from './Play/Play'
import Settings from './Settings/Settings'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
            <Route path="/login" element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path="/play" element={<Play />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="leaderboards" element={<Leaderboards />} />
            <Route path="*" element={<NoPage />} /> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
