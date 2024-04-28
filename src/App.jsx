import {useState} from 'react'
import '../src/styles/global.css'
import {Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import Setting from "./pages/settings/Setting";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/setting"} element={<Setting/>}/>
            </Routes>
        </>
    )
}

export default App
