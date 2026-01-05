import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import React from "react";

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-sans",
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={ibmPlexSans.variable}>
        <body>{children}</body>
        </html>
    );
}
