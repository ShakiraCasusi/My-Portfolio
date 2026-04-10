import type { Metadata } from "next"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { ScrollToTop } from "@/components/ScrollToTop"

type Props = {
    children: React.ReactNode;
};

export const metadata: Metadata = {
    icons: {
        icon: '/favicon.ico',
    },
    title: "Shakira Angela | Portfolio",
    description: "A modern personal portfolio built with Next.js and Tailwind CSS",
}

export default function RootLayout({
    children,
}: Props) {
    return (
        <html className={cn("dark", "font-sans")} lang="en">
            <body className="bg-slate-950">
                {children}
                <ScrollToTop />
            </body>
        </html>
    );
}
