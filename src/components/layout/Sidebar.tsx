'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Plus, LayoutDashboard } from 'lucide-react';
import { APP_ROUTES } from '@/constants/appRoutes';

const navigation = [
    { name: 'Dashboard', href: APP_ROUTES.DASHBOARD, icon: LayoutDashboard },
    { name: 'All Employees', href: APP_ROUTES.EMPLOYEES_LIST, icon: Users },
    { name: 'Add Employee', href: APP_ROUTES.EMPLOYEES_CREATE, icon: Plus },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 min-h-[calc(100vh-4rem)]">
            <nav className="mt-8 px-4">
                <ul className="space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={
                                        'flex items-center px-4 py-2 text-sm font-medium rounded-lg'
                                        + (isActive
                                            ? 'text-primary-700 border-primary-700'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900')
                                    }
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div >
    );
}