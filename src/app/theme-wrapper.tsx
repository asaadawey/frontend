'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    colorSchemes: {
        dark: true,
    },
});

const darkTheme = createTheme({
    colorSchemes: {
        dark: true,
    },
});

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

    useEffect(() => {
        const saved = localStorage.getItem('mui-theme') as 'light' | 'dark';
        if (saved) setMode(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem('mui-theme', mode);
    }, [mode]);

    return (
        <ThemeProvider theme={theme} defaultMode='light'>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}