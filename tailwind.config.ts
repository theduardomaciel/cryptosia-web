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
                "primary-01": "#EED79C",
                "bg-01": "#121212",
                "gray-200": "#1E1E1E",
                "gray-100": "#2F2F2F",
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
        },
    },
    darkMode: "class",
    plugins: [],
};
export default config;
