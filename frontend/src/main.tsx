import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Play from "./Play/Play";
import Settings from "./Settings/Settings";
import Account from "./Account/Account";
import Leaderboard from "./Leaderboards/Leaderboards";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    redirect,
} from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Cookies from "js-cookie";
import axios from "axios";
import {BACKEND_URL} from "../constants";

// ...

let token = Cookies.get("token");
let isLogin = false;
if (!token) {
    isLogin = false;
} else {
    await axios.post(`${BACKEND_URL}/authorization`, {token: token}).then((res) => {
      if (res.status == 200) {
          isLogin = true;
          console.log("Logged in")
      }
    }).catch((err) => {
      console.log(err);
    });
}



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={isLogin ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                    path="/play"
                    element={isLogin ? <Play /> : <Navigate to="/login" />}
                />
                <Route
                    path="/leaderboards"
                    element={
                        isLogin ? <Leaderboard /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/account"
                    element={isLogin ? <Account /> : <Navigate to="/login" />}
                />
                <Route
                    path="/settings"
                    element={isLogin ? <Settings /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
