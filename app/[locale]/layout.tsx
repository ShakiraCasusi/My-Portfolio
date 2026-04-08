import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { ReactNode } from "react"
import { locales } from "@/src/i18n/request"
import { NextIntlClientProvider } from 'next-intl'

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
    // Ensure locale is valid
    if (!params.locale || !locales.includes(params.locale as any)) {
        notFound();
    }

    // Now get messages with valid locale
    let messages;
    try {
        const locale = params.locale as string;
        messages = (await import(`@/messages/${locale}.json`)).default;
    } catch (error) {
        console.error('[LocaleLayout] Failed to get messages:', error);
        notFound();
    }

    return (
        <NextIntlClientProvider messages={messages}>
            <Navbar />
            <div>
                {children}
            </div>
        </NextIntlClientProvider>
    )
}
