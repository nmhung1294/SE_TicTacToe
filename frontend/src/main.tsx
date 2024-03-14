import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Play from "./Play/Play";
import Settings from "./Settings/Settings";
import Account from "./Account/Account";
import Leaderboard from "./Leaderboards/Leaderboards";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const isLogin = true;
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isLogin ? <Home /> : <PageNotFound />} />
        <Route path="/play" element={<Play />} />
        <Route path="/leaderboards" element={<Leaderboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
