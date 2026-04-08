import { notFound } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { ReactNode } from "react"
import { locales } from "@/src/i18n/request"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type Props = {
    children: ReactNode;
    params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(params.locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <Navbar />
            <div>
                {children}
            </div>
        </NextIntlClientProvider>
    )
}
