'use client';

import { APP_ROUTES } from '@/constants/appRoutes';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
    children: React.ReactNode;
    requireAuth?: boolean;
}

export default function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (requireAuth && !isAuthenticated) {
                router.push(APP_ROUTES.LOGIN);
            } else if (!requireAuth && isAuthenticated) {
                router.push(APP_ROUTES.DASHBOARD);
            }
        }
    }, [isAuthenticated, isLoading, requireAuth, router]);


    if (requireAuth && !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Skeleton />
            </div>
        );
    }

    if (!requireAuth && isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Skeleton />
            </div>
        );
    }

    return <>{children}</>;
}