import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "primary-100": "#FFECBA",
                "primary-200": "#EED79C",
                "bg-01": "#121212",
                "bg-01-light": "#FEFCE8",
                "gray-100": "#2F2F2F",
                "gray-200": "#1E1E1E",
                "white-100": "#F5F5F4",
                "white-200": "#FEF3C7",
            },
            /* padding: {
                wrapper: "var(--wrapper)",
                section: "var(--section)",
                header: "var(--header)",
                link: "calc(var(--header) + 1rem)",
            },
            margin: {
                wrapper: "var(--wrapper)",
                link: "calc(var(--header) + 1rem)",
            }, */
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                sans: "var(--font-jakarta-sans)",
                title: "var(--font-inconsolata)",
                serif: "var(--font-crete-round)",
            },
            animation: {
                flicker: "flicker 0.5s infinite",
                primary: "primary 60s linear infinite",
                secondary: "secondary 60s linear infinite",
                primaryY: "primaryY 120s linear infinite",
                secondaryY: "secondaryY 120s linear infinite",
                primaryY_inverse: "primaryY_inverse 120s linear infinite",
                secondaryY_inverse: "secondaryY_inverse 120s linear infinite",
            },
            keyframes: {
                flicker: {
                    "0%": {
                        opacity: "0",
                    },
                    "50%": {
                        opacity: "1",
                    },
                    "100%": {
                        opacity: "0",
                    },
                },
                primary: {
                    from: {
                        transform: "translateX(0vw)",
                    },
                    to: {
                        transform: "translateX(calc(-100% - 3.5rem))",
                    },
                },
                secondary: {
                    from: {
                        transform: "translateX(calc(100% + 3.5rem))",
                    },
                    to: {
                        transform: "translateX(0vw)",
                    },
                },
                primaryY: {
                    from: {
                        transform: "translateY(0%)",
                    },
                    to: {
                        transform: "translateY(-100%)",
                    },
                },
                secondaryY: {
                    from: {
                        transform: "translateY(100%)",
                    },
                    to: {
                        transform: "translateY(0%)",
                    },
                },
                primaryY_inverse: {
                    from: {
                        transform: "translateY(0%)",
                    },
                    to: {
                        transform: "translateY(100%)",
                    },
                },
                secondaryY_inverse: {
                    from: {
                        transform: "translateY(-100%)",
                    },
                    to: {
                        transform: "translateY(0%)",
                    },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [require("tailwindcss-animate")],
};
export default config;
