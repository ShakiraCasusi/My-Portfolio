'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navbar() {
    const t = useTranslations('nav')
    const [activeSection, setActiveSection] = useState('hero')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'about', 'projects', 'contact']

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    // Check if section is in viewport (with offset for nav height)
                    if (rect.top <= 100 && rect.bottom > 100) {
                        setActiveSection(sectionId)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { id: 'hero', label: t('home') },
        { id: 'about', label: t('about') },
        { id: 'projects', label: t('projects') },
        { id: 'contact', label: t('contact') }
    ]

    const handleNavClick = (sectionId: string) => {
        setActiveSection(sectionId)
        setIsMobileMenuOpen(false)
    }

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <a href="#hero" className="text-2xl font-bold">
                            <span className="text-white">Kira</span>
                            <span className="text-orange-400"> &lt;/&gt;</span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-6 lg:space-x-8">
                            {navItems.map((item) => (
                                <div key={item.id} className="flex flex-col items-center gap-1">
                                    <a
                                        href={`#${item.id}`}
                                        onClick={() => handleNavClick(item.id)}
                                        className={`text-sm font-normal transition-colors ${activeSection === item.id
                                            ? 'text-orange-400'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        {item.label}
                                    </a>
                                    <div className="h-1.5 w-1.5 rounded-full" style={{
                                        backgroundColor: activeSection === item.id ? '#fb923c' : 'transparent'
                                    }}></div>
                                </div>
                            ))}
                            {/* Language Switcher with Pipe Separator */}
                            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden flex flex-col items-center justify-center space-y-1.5 p-2"
                        aria-label="Toggle menu"
                    >
                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4 pt-2 border-t border-white/10">
                        <div className="flex flex-col space-y-3">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`px-3 py-2 rounded-lg text-sm font-normal transition-colors ${activeSection === item.id
                                        ? 'text-orange-400 bg-orange-400/10'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            ))}
                            {/* Language Switcher - Mobile */}
                            <div className="px-3 py-2 border-t border-white/10 pt-3">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
