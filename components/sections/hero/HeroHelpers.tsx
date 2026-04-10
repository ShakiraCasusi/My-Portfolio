'use client'

import { useEffect, useState } from 'react'
import { FaGithub, FaBehance, FaInstagram } from 'react-icons/fa'
import { AiFillTikTok } from 'react-icons/ai'
import { FiLinkedin } from 'react-icons/fi'

const positions = ['Social Media Manager', 'Video Editor', 'Graphic Designer', 'UI/UX Designer', 'Web Developer']

export function ScrollingText() {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % positions.length)
        }, 4000) // Change every 4 seconds
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative h-10 overflow-visible">
            {positions.map((position, index) => (
                <div
                    key={index}
                    className={`absolute transition-all duration-1000 ease-in-out ${index === currentIndex
                        ? 'opacity-100 translate-y-0'
                        : index === (currentIndex + 1) % positions.length
                            ? 'opacity-0 translate-y-8'
                            : 'opacity-0 -translate-y-8'
                        }`}
                >
                    <span className="text-white font-bold text-2xl lg:text-3xl border-b-2 border-orange-400/40 pb-0.5 leading-none whitespace-nowrap tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {position}
                    </span>
                </div>
            ))}
        </div>
    )
}

export function TypingEffect({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState('')
    const [showCursor, setShowCursor] = useState(true)

    useEffect(() => {
        let index = 0
        const typingInterval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.substring(0, index + 1))
                index++
            } else {
                clearInterval(typingInterval)
            }
        }, 50) // Typing speed

        return () => clearInterval(typingInterval)
    }, [text])

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev)
        }, 500) // Blink speed

        return () => clearInterval(cursorInterval)
    }, [])

    return (
        <div className="inline">
            <span className="text-gray-300 text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>{displayedText}</span>
            {showCursor && <span className="ml-1 text-orange-400/40 font-bold animate-pulse">|</span>}
        </div>
    )
}

export function SocialIcons() {
    const socials = [
        {
            name: 'GitHub',
            Icon: FaGithub,
            url: 'https://github.com/ShakiraCasusi',
            label: 'GitHub Profile'
        },
        {
            name: 'LinkedIn',
            Icon: FiLinkedin,
            url: 'https://www.linkedin.com/in/shakira-casusi-31612631a/',
            label: 'LinkedIn Profile'
        },
        {
            name: 'Behance',
            Icon: FaBehance,
            url: 'https://www.behance.net/shakiracasusi',
            label: 'Behance Portfolio'
        },
        {
            name: 'Instagram',
            Icon: FaInstagram,
            url: 'https://www.instagram.com/k.rscu/',
            label: 'Instagram Profile'
        },
        {
            name: 'TikTok',
            Icon: AiFillTikTok,
            url: 'https://www.tiktok.com/@pnzz7e',
            label: 'TikTok Profile'
        },
    ]

    return (
        <div className="flex gap-5 mt-6">
            {socials.map((social) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                    <social.Icon size={24} />
                </a>
            ))}
        </div>
    )
}
