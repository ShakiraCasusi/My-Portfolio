import type { Metadata } from "next"
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import "@/styles/globals.css"

type Props = {
    children: React.ReactNode;
};

export const metadata: Metadata = {
    title: "Shakira Angela | Portfolio",
    description: "A modern personal portfolio built with Next.js and Tailwind CSS",
}

export default async function RootLayout({
    children,
}: Props) {
    const messages = await getMessages();

    return (
        <html>
            <body>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
