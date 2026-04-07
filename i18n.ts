// This file is deprecated. Use src/i18n/request.ts instead.

import { locales as configLocales } from './i18n.config';

export type Locale = typeof configLocales[number];
export const locales = configLocales;

