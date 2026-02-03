'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AdminLanguageProvider, useAdminLanguage } from '@/contexts/AdminLanguageContext';
import AdminLanguageSwitcher from '@/components/AdminLanguageSwitcher';

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useAdminLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    // Verify authentication on mount
    const verifyAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();

        if (!response.ok || !data.success) {
          router.push('/admin-genix');
          return;
        }

        setUserEmail(data.user.email);
        setIsLoading(false);
      } catch (error) {
        console.error('Auth verification failed:', error);
        router.push('/admin-genix');
      }
    };

    verifyAuth();
  }, [router]);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/admin-genix');
        router.refresh();
      } else {
        console.error('Logout failed');
        router.push('/admin-genix');
      }
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/admin-genix');
    } finally {
      setLoggingOut(false);
    }
  };

  const navItems = [
    {
      name: t('nav.dashboard'),
      path: '/admin-genix/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: t('nav.services'),
      path: '/admin-genix/dashboard/services',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: 'Blog',
      path: '/admin-genix/dashboard/blogs',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
    {
      name: 'Reviews',
      path: '/admin-genix/dashboard/reviews',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      name: 'Statistics',
      path: '/admin-genix/dashboard/statistics',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: 'About Us',
      path: '/admin-genix/dashboard/about-us',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: 'FAQs',
      path: '/admin-genix/dashboard/faqs',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: t('nav.settings'),
      path: '/admin-genix/dashboard/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-indigo-600"></div>
          <p className="mt-4 text-gray-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed left-0 top-0 z-30`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
            {isSidebarOpen ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-gray-900">Admin Panel</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {navItems.map((item) => {
              const isActive = item.path === '/admin-genix/dashboard'
                ? pathname === item.path
                : pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 mb-1 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-blue-600 border border-cyan-100'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={!isSidebarOpen ? item.name : undefined}
                >
                  <span className={`${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}>
                    {item.icon}
                  </span>
                  {isSidebarOpen && (
                    <span className="font-medium text-sm">{item.name}</span>
                  )}
                  {isActive && isSidebarOpen && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          {isSidebarOpen && (
            <div className="p-3 border-t border-gray-200">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3 border border-cyan-100">
                <p className="text-xs font-semibold text-blue-900 mb-1">Need Help?</p>
                <p className="text-xs text-blue-700">Check documentation</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 z-20" style={{ left: isSidebarOpen ? '16rem' : '5rem' }}>
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="border-l border-gray-200 pl-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  ركن النخيل
                </h1>
                <p className="text-xs text-gray-500">Content Management System</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AdminLanguageSwitcher />

              <div className="hidden sm:flex items-center gap-2.5 px-3 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-900">{userEmail}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {loggingOut ? t('modal.saving') : t('nav.logout')}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-16">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLanguageProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AdminLanguageProvider>
  );
}
