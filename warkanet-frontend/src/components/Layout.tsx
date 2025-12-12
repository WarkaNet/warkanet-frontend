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
        <div className="min-h-screen transition-colors duration-300">
            {/* Navigation Header with glassmorphism */}
            <nav className="
                glass-light dark:glass-dark
                sticky top-0 z-50
                border-b border-gray-200/50 dark:border-purple-500/20
                transition-all duration-300
            ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/merchant/dashboard" className="flex items-center space-x-2 group">
                                <div className="
                                    w-8 h-8 sm:w-10 sm:h-10
                                    bg-gradient-to-br from-primary-500 to-primary-700
                                    dark:from-accent-purple-DEFAULT dark:to-accent-pink-DEFAULT
                                    rounded-lg flex items-center justify-center
                                    shadow-light dark:shadow-dark-glow
                                    transition-all duration-300
                                    group-hover:scale-110
                                ">
                                    <span className="text-white font-bold text-lg sm:text-xl">W</span>
                                </div>
                                <span className="
                                    text-lg sm:text-xl font-bold
                                    text-gray-900 dark:text-white
                                    transition-colors duration-300
                                ">
                                    WarkaNet
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`
                                            flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-lg
                                            transition-all duration-200
                                            ${isActive
                                                ? 'bg-primary-50 dark:bg-gradient-to-r dark:from-purple-500/20 dark:to-pink-500/20 text-primary-700 dark:text-purple-300 font-medium shadow-light dark:shadow-dark-glow'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                                            }
                                        `}
                                    >
                                        <Icon size={18} />
                                        <span className="text-sm xl:text-base">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right side - Theme toggle & Mobile menu */}
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {/* Theme Toggle */}
                            <ThemeToggle />

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="
                                    lg:hidden p-2 rounded-lg
                                    text-gray-600 dark:text-gray-300
                                    hover:bg-gray-100 dark:hover:bg-white/5
                                    transition-all duration-200
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
                    <div className="
                        lg:hidden
                        border-t border-gray-200/50 dark:border-purple-500/20
                        glass-light dark:glass-dark
                    ">
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
                                                ? 'bg-primary-50 dark:bg-gradient-to-r dark:from-purple-500/20 dark:to-pink-500/20 text-primary-700 dark:text-purple-300 font-medium'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
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

            {/* Main Content - Responsive padding */}
            <main className="
                max-w-7xl mx-auto
                px-4 sm:px-6 lg:px-8
                py-4 sm:py-6 lg:py-8
                transition-all duration-300
            ">
                <Outlet />
            </main>
        </div>
    );
}
