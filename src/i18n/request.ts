import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'tl', 'ceb', 'ko', 'ja', 'zh', 'de', 'id'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
    // The plugin automatically provides the locale from the URL
    const locale = 'en';

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});