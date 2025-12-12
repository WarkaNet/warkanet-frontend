/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                // Light mode - inspired by soft pastels
                light: {
                    bg: {
                        primary: '#f8fafc',
                        secondary: '#e0e7ff',
                        card: '#ffffff',
                    },
                    text: {
                        primary: '#1e293b',
                        secondary: '#64748b',
                    },
                    accent: {
                        blue: '#dbeafe',
                        purple: '#e9d5ff',
                        peach: '#fed7aa',
                        lavender: '#e0e7ff',
                    }
                },
                // Dark mode - inspired by cosmic theme
                dark: {
                    bg: {
                        primary: '#0f0a1f',
                        secondary: '#1a1235',
                        card: 'rgba(30, 20, 60, 0.6)',
                    },
                    text: {
                        primary: '#ffffff',
                        secondary: '#a78bfa',
                    },
                    accent: {
                        purple: '#a855f7',
                        pink: '#ec4899',
                        glow: '#c084fc',
                    }
                },
                // Primary brand colors with gradients
                primary: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7e22ce',
                    800: '#6b21a8',
                    900: '#581c87',
                    950: '#3b0764',
                },
                // Accent colors
                accent: {
                    purple: {
                        light: '#e9d5ff',
                        DEFAULT: '#a855f7',
                        dark: '#7e22ce',
                    },
                    blue: {
                        light: '#dbeafe',
                        DEFAULT: '#60a5fa',
                        dark: '#3b82f6',
                    },
                    pink: {
                        light: '#fce7f3',
                        DEFAULT: '#ec4899',
                        dark: '#db2777',
                    },
                    peach: {
                        light: '#fed7aa',
                        DEFAULT: '#fb923c',
                        dark: '#ea580c',
                    }
                }
            },
            backgroundImage: {
                'gradient-light': 'linear-gradient(to bottom right, #f0f9ff, #e0e7ff, #fce7f3)',
                'gradient-dark': 'linear-gradient(to bottom, #0f0a1f, #1a1235, #2d1b69)',
                'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'gradient-cosmic': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                'gradient-card-light': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                'gradient-card-dark': 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
            },
            boxShadow: {
                'light': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'light-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'light-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'dark-glow': '0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(168, 85, 247, 0.1)',
                'dark-glow-pink': '0 0 20px rgba(236, 72, 153, 0.3), 0 0 40px rgba(236, 72, 153, 0.1)',
                'cosmic': '0 8px 32px 0 rgba(168, 85, 247, 0.37)',
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' },
                    '100%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.3)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            screens: {
                'xs': '475px',
                // sm: 640px (default)
                // md: 768px (default)
                // lg: 1024px (default)
                // xl: 1280px (default)
                '2xl': '1536px',
                '3xl': '1920px',
            }
        },
    },
    plugins: [],
}
