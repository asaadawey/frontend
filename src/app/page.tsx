'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { APP_ROUTES } from '@/constants/appRoutes';
import { Skeleton } from '@mui/material';

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push(APP_ROUTES.DASHBOARD);
      } else {
        router.push(APP_ROUTES.LOGIN);
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (

    <Skeleton />

  );
}