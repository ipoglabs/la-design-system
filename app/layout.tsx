import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { COUNTRY_COOKIE, isSupportedCountry } from "@/lib/country-context";
import { CountryProvider } from "@/components/country/CountryProvider";
import { CountryDetector } from "@/components/country/CountryDetector";
import { ToastProvider } from "@/components/ui/toast";

const inter = localFont({
  src: [
    { path: "../public/assets/fonts/inter/InterVariable.woff2", style: "normal" },
    { path: "../public/assets/fonts/inter/InterVariable-Italic.woff2", style: "italic" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const interDisplay = localFont({
  src: [
    { path: "../public/assets/fonts/inter/InterDisplay-Thin.woff2", weight: "100", style: "normal" },
    { path: "../public/assets/fonts/inter/InterDisplay-ThinItalic.woff2", weight: "100", style: "italic" },
    { path: "../public/assets/fonts/inter/InterDisplay-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../public/assets/fonts/inter/InterDisplay-ExtraLightItalic.woff2", weight: "200", style: "italic" },
    { path: "../public/assets/fonts/inter/InterDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/assets/fonts/inter/InterDisplay-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../public/assets/fonts/inter/InterDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/assets/fonts/inter/InterDisplay-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/assets/fonts/inter/InterDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/assets/fonts/inter/InterDisplay-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../public/assets/fonts/inter/InterDisplay-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/assets/fonts/inter/InterDisplay-SemiBoldItalic.woff2", weight: "600", style: "italic" },
    { path: "../public/assets/fonts/inter/InterDisplay-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/assets/fonts/inter/InterDisplay-BoldItalic.woff2", weight: "700", style: "italic" },
    { path: "../public/assets/fonts/inter/InterDisplay-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../public/assets/fonts/inter/InterDisplay-ExtraBoldItalic.woff2", weight: "800", style: "italic" },
    { path: "../public/assets/fonts/inter/InterDisplay-Black.woff2", weight: "900", style: "normal" },
    { path: "../public/assets/fonts/inter/InterDisplay-BlackItalic.woff2", weight: "900", style: "italic" },
  ],
  variable: "--font-inter-display",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "poc-next",
  description: "UI/UX playground — components and experiments",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies();
  const raw = jar.get(COUNTRY_COOKIE)?.value ?? "";
  const country = isSupportedCountry(raw) ? raw : null;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${interDisplay.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          {country ? (
            <CountryProvider country={country}>{children}</CountryProvider>
          ) : (
            <CountryDetector />
          )}
        </ToastProvider>
      </body>
    </html>
  );
}
