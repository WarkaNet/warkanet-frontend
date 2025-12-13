import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    Home,
    Gift,
    CheckCircle,
    TrendingUp,
    Building2,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const navigationItems = [
    { name: 'Dashboard', path: '/merchant/dashboard', icon: Home },
    { name: 'Issue Reward', path: '/merchant/issue', icon: Gift },
    { name: 'Accept Redemption', path: '/merchant/accept-redemption', icon: CheckCircle },
    { name: 'Analytics', path: '/merchant/analytics', icon: TrendingUp },
    { name: 'Equity', path: '/merchant/equity', icon: Building2 },
];

export default function Layout() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* Navigation Header */}
            <nav className="
                bg-white/80 dark:bg-gray-900/80
                backdrop-blur-xl
                border-b border-gray-200/50 dark:border-gray-800/50
                sticky top-0 z-50
            ">
                <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/merchant/dashboard" className="flex items-center space-x-3 group">
                                <div className="
                                    w-12 h-12
                                    bg-gradient-indigo
                                    rounded-xl flex items-center justify-center
                                    shadow-lg
                                    transition-transform duration-300
                                    group-hover:scale-110
                                ">
                                    <span className="text-white font-bold text-xl">W</span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    WarkaNet
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation - Aligned to Right */}
                        <div className="hidden lg:flex items-center space-x-4 ml-auto mr-8">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`
                                            flex items-center gap-2 px-5 py-3 rounded-xl
                                            transition-all duration-200
                                            text-base font-medium
                                            ${isActive
                                                ? 'bg-gradient-indigo text-white shadow-lg'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }
                                        `}
                                    >
                                        <Icon size={20} strokeWidth={2.5} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center space-x-4">
                            <ThemeToggle />

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="
                                    lg:hidden p-2 rounded-lg
                                    text-gray-600 dark:text-gray-300
                                    hover:bg-gray-100 dark:hover:bg-gray-800
                                "
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200/50 dark:border-gray-800/50">
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`
                                            flex items-center space-x-3 px-4 py-3 rounded-lg
                                            transition-all duration-200
                                            ${isActive
                                                ? 'bg-gradient-indigo text-white'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }
                                        `}
                                    >
                                        <Icon size={20} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="max-w-[1920px] mx-auto px-8 lg:px-16 py-16">
                <Outlet />
            </main>
        </div>
    );
}
