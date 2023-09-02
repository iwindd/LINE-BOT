import './index.css';
import React from 'react'
import ReactDOM from 'react-dom/client'

import i18n from './i18n';

import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@emotion/react';
import { theme } from './components/Theme';

import App from './app';



ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
                <App/>
            </I18nextProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
