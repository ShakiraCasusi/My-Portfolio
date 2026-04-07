// This file is deprecated. Use src/i18n/request.ts instead.

export const locales = ['en', 'tl', 'ceb', 'ko', 'ja', 'zh', 'de', 'id'] as const;
export type Locale = (typeof locales)[number];
