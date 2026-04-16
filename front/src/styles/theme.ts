import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2e7d32',
            light: '#a5d6a7',
            dark: '#1b5e20',
            contrastText: '#fff',
        },

        secondary: {
            main: '#ff8a65',
        },

        background: {
            default: '#F9FBF9',
        },
    },
    typography: {
        fontFamily: '"Pretendard", "Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 12,
    },
});

export default theme;