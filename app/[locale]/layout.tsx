import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { locales } from "@/src/i18n/request"

export const metadata: Metadata = {
    title: "Shakira Angela | Portfolio",
    description: "A modern personal portfolio built with Next.js and Tailwind CSS",
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export default function LocaleLayout({ children, params }: Props) {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(params.locale as any)) {
        notFound();
    }

    return (
        <html lang={params.locale} className={cn("dark", "font-sans")}>
            <body className="bg-slate-950">
                <Navbar />
                <div>
                    {children}
                </div>
            </body>
        </html>
    )
}
