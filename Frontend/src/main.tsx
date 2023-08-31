import './index.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './layouts/navbar';
import i18n from './i18n';

import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@emotion/react';
import { theme } from './components/Theme';

import SignIn from './pages/auth/signin';
import Dashboard from './pages/dashboard';
import Error from './pages/error';

function OutletNavbar() {
    return (
        <Navbar>
            <Outlet />
        </Navbar>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <CssBaseline />
                    <Routes>
                        <Route path='/' element={<OutletNavbar />}>
                            <Route index element={<Dashboard />} />
                            <Route path='/users' element={<Dashboard />} />

                            <Route path='/*' element={<Error />}></Route>
                        </Route>

                        <Route path='/signin' element={<SignIn />}></Route>
                    </Routes>
                </BrowserRouter>
            </I18nextProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
