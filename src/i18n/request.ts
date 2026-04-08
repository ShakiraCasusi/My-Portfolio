import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'tl', 'akl', 'ko'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }: any) => {
    console.log('[i18n/request] Loading config for locale:', locale);

    // Handle undefined locale - default to 'en'
    const finalLocale = locale || 'en';
    
    console.log('[i18n/request] Using final locale:', finalLocale);

    // Validate locale
    if (!locales.includes(finalLocale as Locale)) {
        console.error('[i18n/request] Invalid locale:', finalLocale);
        notFound();
    }

    const messages = (await import(`../../messages/${finalLocale}.json`)).default;

    console.log('[i18n/request] Loaded messages for:', finalLocale);

    return {
        locale: finalLocale,
        messages
    };
});