import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import "@/styles/globals.css"
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Shakira Angela | Portfolio",
    description: "A modern personal portfolio built with Next.js and Tailwind CSS",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={cn("dark", "font-sans")}>
            <body className="bg-slate-950">
                <Navbar />
                {children}
            </body>
        </html>
    )
}
