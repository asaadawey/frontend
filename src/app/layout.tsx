import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import ThemeWrapper from './theme-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Employee Hierarchy Management',
  description: 'Manage your organization\'s employee hierarchy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeWrapper>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeWrapper>
      </body>
    </html>
  );
}