/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Light mode (EthlyFi inspired) - Soft pastels
                light: {
                    bg: {
                        primary: '#FAFBFF',
                        secondary: '#F3E8FF',
                        gradient: {
                            start: '#F3E8FF',
                            end: '#FFFFFF',
                        }
                    }
                },
                // Dark mode (BuildXT inspired) - Cosmic/Space
                dark: {
                    bg: {
                        primary: '#0F172A',
                        secondary: '#1E003A',
                        gradient: {
                            start: '#1A0033',
                            end: '#000000',
                        }
                    }
                },
            },
            backgroundImage: {
                // Light mode gradients
                'gradient-light-bg': 'linear-gradient(to bottom right, #F3E8FF, #FFFFFF)',
                'gradient-light-card': 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',

                // Dark mode gradients
                'gradient-dark-bg': 'linear-gradient(to bottom, #1A0033, #0F172A, #000000)',
                'gradient-dark-card': 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)',

                // Metric card gradients
                'gradient-indigo': 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                'gradient-green': 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
                'gradient-red': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                'gradient-purple': 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
            },
            boxShadow: {
                // Light mode shadows
                'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
                'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.08)',

                // Dark mode glows
                'glow-purple': '0 0 40px rgba(168, 85, 247, 0.3), 0 0 20px rgba(168, 85, 247, 0.2)',
                'glow-indigo': '0 0 40px rgba(99, 102, 241, 0.3), 0 0 20px rgba(99, 102, 241, 0.2)',
                'glow-green': '0 0 40px rgba(34, 197, 94, 0.3), 0 0 20px rgba(34, 197, 94, 0.2)',
                'glow-red': '0 0 40px rgba(239, 68, 68, 0.3), 0 0 20px rgba(239, 68, 68, 0.2)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
