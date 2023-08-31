import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/auth/signin';
import Dashboard from './pages/dashboard';
import './index.css';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { theme } from './components/Theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <CssBaseline />
                    <Routes>
                        <Route path='/' element={<Dashboard />}></Route>
                        <Route path='/signin' element={<SignIn />}></Route>
                    </Routes>
                </BrowserRouter>
            </I18nextProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
