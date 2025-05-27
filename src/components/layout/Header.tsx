'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';
import { LogOut, User, Moon, Sun } from 'lucide-react';

export default function Header() {
    const { setMode, mode } = useColorScheme();
    const { user, logout } = useAuth();

    const onColorModeClick = () => {
        setMode(mode === "dark" ? "light" : "dark")
    }

    return (
        <header>
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold">
                            Employee Hierarchy Management
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <User className="w-5 h-5" />
                            <span className="text-sm">{user?.name}</span>
                        </div>
                        <Button variant='text' onClick={onColorModeClick}>
                            {mode === "dark" ? <Sun /> : <Moon />}
                        </Button>
                        <Button
                            variant="text"
                            onClick={logout}
                            className="flex items-center space-x-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}