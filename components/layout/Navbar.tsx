'use client'

import { useState, useEffect } from 'react'

export function Navbar() {
    const [activeSection, setActiveSection] = useState('hero')

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
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' }
    ]

    const handleNavClick = (sectionId: string) => {
        setActiveSection(sectionId)
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
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
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
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
