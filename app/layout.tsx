import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

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

// Usar como está escrito na documentação do Next.js resulta em um erro de hidratação. (https://nextjs.org/docs/app/api-reference/components/script#beforeinteractive)
// Para contornar o erro, adicionamos o elemento <head> manualmente e colocamos o script lá dentro.

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <head>
                <script src="/wasm/cryptosia.js" />
            </head>
            <html suppressHydrationWarning lang="pt-br">
                <body
                    className={`${inconsolata.variable} ${crete_round.variable} ${jakarta_sans.variable}`}
                >
                    <Providers>{children}</Providers>
                </body>
            </html>
        </>
    );
}
