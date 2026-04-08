'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useState } from 'react';

const languages = [
    { code: 'en', name: 'English', label: 'ENG' },
    { code: 'tl', name: 'Tagalog', label: 'TGL' },
    { code: 'akl', name: 'Aklanon', label: 'AKL' },
    { code: 'ko', name: 'Korean', label: 'KOR' },
];

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const currentLanguage = languages.find(lang => lang.code === locale);

    const handleLanguageChange = (newLocale: string) => {
        // Replace current locale with new locale in pathname
        // Pattern: /locale/path or /locale (and handle root case)
        let newPathname = pathname;

        if (pathname === '/' || pathname === '') {
            // Root path: redirect to new locale root
            newPathname = `/${newLocale}`;
        } else {
            // Replace the first locale segment safely
            // Pathname format: /locale/... → replace /locale with /newLocale
            const pathSegments = pathname.split('/').filter(Boolean); // remove empty strings
            if (pathSegments.length > 0 && ['en', 'tl', 'akl', 'ko'].includes(pathSegments[0])) {
                pathSegments[0] = newLocale;
                newPathname = '/' + pathSegments.join('/');
            } else {
                // Fallback for unexpected format
                newPathname = `/${newLocale}`;
            }
        }

        router.push(newPathname);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-normal h-6 whitespace-nowrap"
                title={currentLanguage?.name}
            >
                <Globe size={16} className="flex-shrink-0" />
                <span>{currentLanguage?.label}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-lg shadow-lg py-2 z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors text-sm h-10 ${locale === lang.code
                                ? 'bg-orange-400/20 text-orange-400'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Globe size={16} className="flex-shrink-0" />
                            <span className="flex-1">{lang.label}</span>
                            <span className="text-xs text-gray-500 flex-shrink-0">({lang.name})</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
