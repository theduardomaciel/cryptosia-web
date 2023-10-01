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

const APP_NAME = "cryptosia";
const APP_DEFAULT_TITLE = "cryptosia";
const APP_TITLE_TEMPLATE = "%s - cryptosia";
const APP_DESCRIPTION = "Criptografia RSA simplificada.";

export const metadata: Metadata = {
	metadataBase: new URL("https://cryptosia.vercel.app"),
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	themeColor: "#EED79C",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_DEFAULT_TITLE,
		// startUpImage: [],
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: "summary",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
};

// Usar como está escrito na documentação do Next.js resulta em um erro de hidratação. (https://nextjs.org/docs/app/api-reference/components/script#beforeinteractive)
// Para contornar o erro, adicionamos o elemento <head> manualmente e colocamos o script lá dentro.

export default function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<>
			<html suppressHydrationWarning lang="pt-br">
				<body
					className={`${inconsolata.variable} ${crete_round.variable} ${jakarta_sans.variable}`}
				>
					<Providers>
						{children}
						{modal}
					</Providers>
					<Script
						src="/wasm/cryptosia.js"
						strategy="beforeInteractive"
					/>
					{/* <Script>
                        {`if (window.localStorage.getItem("disable-typing-animation") === "true") {
                            document.documentElement.classList.add("disable-typing-animation");
                        }`}
                    </Script> */}
				</body>
			</html>
		</>
	);
}

/* <head>
    <Script src="/wasm/cryptosia.js" strategy="beforeInteractive" />
</head> */
