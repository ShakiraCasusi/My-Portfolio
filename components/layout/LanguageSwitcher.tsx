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
        // Remove the current locale from the pathname
        const segments = pathname.split('/');
        segments[1] = newLocale;
        const newPathname = segments.join('/');

        router.push(newPathname);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-normal"
                title={currentLanguage?.name}
            >
                <Globe size={16} />
                <span>{currentLanguage?.label}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-lg shadow-lg py-2 z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors ${locale === lang.code
                                ? 'bg-orange-400/20 text-orange-400'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <Globe size={14} />
                            <span>{lang.label}</span>
                            <span className="text-xs text-gray-500">({lang.name})</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
