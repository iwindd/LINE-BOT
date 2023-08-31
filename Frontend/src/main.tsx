import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/auth/signin';
import Dashboard from './pages/dashboard';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />}></Route>
                <Route path='/signin' element={<SignIn />}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
