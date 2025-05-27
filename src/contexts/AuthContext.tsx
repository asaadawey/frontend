'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, LoginRequest } from '@/types/auth';
import { AuthService } from '@/lib/auth';
import toast from 'react-hot-toast';

interface AuthContextType {
    user: User | null;
    login: (credentials: LoginRequest) => Promise<void>;
    // register: (userData: RegisterRequest) => Promise<void>;
    logout: () => void;
    errorMessage: string;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [errorMessage, setErrorMessage] = useState<"">("");
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("")
            }, 5000)
        }
    }, [errorMessage])

    useEffect(() => {
        // Check if user is already logged in
        const savedUser = AuthService.getUser();
        if (savedUser && AuthService.isAuthenticated()) {
            setUser(savedUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginRequest) => {
        try {
            setErrorMessage("");
            setIsLoading(true);
            const response = await AuthService.login(credentials);
            setUser(response.user);
        } catch (error: any) {
            setErrorMessage(error.message || 'Login failed');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // const register = async (userData: RegisterRequest) => {
    //     try {
    //         setErrorMessage("");
    //         setIsLoading(true);
    //         const response = await AuthService.register(userData);
    //         setUser(response.user);
    //         toast.success('Registration successful!');
    //     } catch (error: any) {
    //         setErrorMessage(error.message || 'Registration failed');
    //         throw error;
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const logout = () => {
        AuthService.logout();
        setUser(null);
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        login,
        // register,
        logout,
        isLoading,
        errorMessage,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}