import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const fraunces = Fraunces({
	variable: "--font-fraunces",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://hullsuperstore.co.uk";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default:
			"Hull Superstore | African Food & Grocery Shop on Beverley Road, Hull",
		template: "%s | Hull Superstore",
	},
	description:
		"Hull Superstore is an African grocery shop on Beverley Road, Hull (HU5 1NR). A large selection of African foods, drinks, toiletries and beauty products with friendly, welcoming service.",
	keywords: [
		"African food shop Hull",
		"African grocery Hull",
		"African store Beverley Road",
		"African beauty products Hull",
		"African foods HU5",
		"grocery shop Hull",
		"Hull Superstore",
	],
	openGraph: {
		title: "Hull Superstore — African Food & Grocery Shop in Hull",
		description:
			"A large selection of African foods, drinks, toiletries and beauty products on Beverley Road, Hull. Friendly, welcoming service.",
		url: SITE_URL,
		siteName: "Hull Superstore",
		locale: "en_GB",
		type: "website",
	},
	alternates: { canonical: SITE_URL },
	robots: { index: true, follow: true },
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "GroceryStore",
	name: "Hull Superstore",
	description:
		"African grocery shop offering a large selection of African foods, drinks, toiletries and beauty products in Hull.",
	address: {
		"@type": "PostalAddress",
		streetAddress: "Newlands House, Beverley Road",
		addressLocality: "Hull",
		addressRegion: "East Riding of Yorkshire",
		postalCode: "HU5 1NR",
		addressCountry: "GB",
	},
	geo: {
		"@type": "GeoCoordinates",
		latitude: 53.7675418,
		longitude: -0.3542095,
	},
	url: SITE_URL,
	aggregateRating: {
		"@type": "AggregateRating",
		ratingValue: "4.9",
		reviewCount: "8",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en-GB"
			className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD for SEO
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				{children}
			</body>
		</html>
	);
}
