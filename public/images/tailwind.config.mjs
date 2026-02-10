/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                espresso: '#1a120b',
                walnut: '#3d2b1f',
                cognac: '#9c6644',
                parchment: '#fdfcfb',
                parchet: {
                    50: '#fbf7f3',
                    100: '#f5ebe4',
                    200: '#ead6c6',
                    300: '#debda3',
                    400: '#cf9e79',
                    500: '#c58356',
                    600: '#b86a45',
                    700: '#99533a',
                    800: '#7d4533',
                    900: '#653a2d',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Lora', 'serif'],
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            }
        },
    },
    plugins: [],
}
