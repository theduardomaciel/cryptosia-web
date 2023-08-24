import "./globals.css";
import type { Metadata } from "next";

import { Inconsolata, Crete_Round, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";

const inconsolata = Inconsolata({
    subsets: ["latin"],
    variable: "--font-inconsolata",
    display: "swap",
});

const crete_round = Crete_Round({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-crete-round",
    display: "swap",
});

const jakarta_sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "cryptosia",
    description: "Criptografia RSA simplificada.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html suppressHydrationWarning lang="pt-br">
            <body
                className={`${inconsolata.variable} ${crete_round.variable} ${jakarta_sans.variable}`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
