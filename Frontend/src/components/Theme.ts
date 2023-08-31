import { createTheme } from '@mui/material/styles';

import '@fontsource/sarabun/300.css';
import '@fontsource/sarabun/400.css';
import '@fontsource/sarabun/500.css';
import '@fontsource/sarabun/700.css';

export const theme = createTheme({
    typography: {
        fontFamily: 'Sarabun',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'Sarabun';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                }

                ::-webkit-scrollbar {
                    display: none;
                }
            `,
        }
    },
});