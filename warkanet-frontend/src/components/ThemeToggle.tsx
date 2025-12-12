import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        // Check localStorage or system preference
        const stored = localStorage.getItem('darkMode');
        if (stored !== null) {
            return stored === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Apply dark mode class to body
        if (darkMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
        // Save preference
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="
                relative p-2 rounded-lg transition-all duration-300
                bg-white dark:bg-dark-bg-card
                border border-gray-200 dark:border-purple-500/30
                hover:shadow-light-md dark:hover:shadow-dark-glow
                group
            "
            aria-label="Toggle dark mode"
        >
            <div className="relative w-5 h-5">
                {/* Sun icon - visible in dark mode */}
                <Sun
                    className={`
                        absolute inset-0 transition-all duration-300
                        ${darkMode
                            ? 'opacity-100 rotate-0 text-yellow-400'
                            : 'opacity-0 rotate-90 text-gray-400'
                        }
                    `}
                    size={20}
                />
                {/* Moon icon - visible in light mode */}
                <Moon
                    className={`
                        absolute inset-0 transition-all duration-300
                        ${!darkMode
                            ? 'opacity-100 rotate-0 text-purple-600'
                            : 'opacity-0 -rotate-90 text-gray-400'
                        }
                    `}
                    size={20}
                />
            </div>
        </button>
    );
}
