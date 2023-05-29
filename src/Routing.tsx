import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import QSection from './Components/QSection';
import Result from './Components/Result';

const Routing: React.FC = () => {

    const userData = useSelector((state: RootState) => state.userReducer)

    return(
        <BrowserRouter basename='quiz-game'>
            <Routes>
                <Route path="" element={<Home/>}/>

                {
                    userData.name ? 
                    <>
                        <Route path="/questions" element={<QSection/>}/>
                        <Route path="/result" element={<Result/>}/>
                    </>:
                    <>
                        <Route path="/questions" element={<Home/>}/>
                        <Route path="/result" element={<Home/>}/>
                    </>
                
                }
                

            </Routes>
        </BrowserRouter>
    )
}

export default Routing