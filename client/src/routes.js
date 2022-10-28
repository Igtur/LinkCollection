import React from 'react';
import { Routes, Route } from 'react-router-dom'; // import { Routes, Route, Navigate } from 'react-router-dom';
import { LinksPage } from './pages/LinksPage';
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { AuthPage } from './pages/AuthPage';

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='/links' exact element = {<LinksPage />}>
                   
                </Route>
                <Route path='/create' exact element = {<CreatePage />}>
                   
                </Route>
                <Route path='/detail/:id' element = {<DetailPage />}>
                    
                </Route>
                {/* <Navigate to="/create" /> */}
            </Routes>
        )
    }

    return (
        // <Routes>

        //     <Route path="/" exact >
        //         <AuthPage />
        //     </Route>

        //     <Navigate to="/" />

        // </Routes>

        <Routes>

            <Route path="/" exact element = {<AuthPage />}>
                
            </Route>


            {/* <Navigate to="/" /> */}
        </Routes>
    )
}