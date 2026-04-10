'use client'

import { MdDownload } from 'react-icons/md'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false })

const SlotMachineNumber = ({ value }: { value: string }) => {
    const numberRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        if (!numberRef.current) return

        const element = numberRef.current
        const finalValue = parseInt(value)
        let currentValue = 0
        const duration = 2000
        const steps = 30
        const increment = finalValue / steps
        let elapsed = 0

        const animate = () => {
            elapsed += 66
            const progress = Math.min(elapsed / duration, 1)

            if (progress < 1) {
                currentValue = Math.floor(increment * (elapsed / 66))
                element.textContent = currentValue.toString()
                element.style.transform = `translateY(${progress * 20}px)`
                element.style.opacity = (1 - progress * 0.2).toString()
                requestAnimationFrame(animate)
            } else {
                currentValue = finalValue
                element.textContent = value
                element.style.transform = 'translateY(0)'
                element.style.opacity = '1'
            }
        }

        // Start animation when in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate()
                    observer.unobserve(element)
                }
            },
            { threshold: 0.5 }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [value])

    return (
        <h3
            ref={numberRef}
            className="text-3xl lg:text-4xl font-bold text-orange-400 transition-all"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            {value}
        </h3>
    )
}

export function About() {
    const aboutStrings = {
        title: 'About Me',
        subtitle: 'Bridging leadership with technical precision.',
        description1: 'My digital journey began in my first year of college, fueled by a passion for public service and leadership. I\'ve always believed that technology is at its best when it serves people, and I aim to guide businesses and individuals toward solutions that truly make an impact.',
        description2: 'Currently majoring in Software Development at Mapúa Malayan Colleges Laguna, I combine technical expertise with strong communication and leadership skills. This unique synergy allows me to manage complex projects while ensuring every digital solution is both functional and human-centered.',
        experience: 'Years Experience',
        projects: 'Projects Done',
        clients: 'Happy Clients',
        downloadCv: 'Download CV'
    }
    return (
        <section id="about" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div className="w-full max-w-6xl">
                {/* Main Container with Border */}
                <div className="bg-gray-900/40 border-2 border-orange-400 rounded-3xl p-6 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 items-start">
                        {/* Left - Lanyard (1 Column) */}
                        <div className="flex justify-center items-center h-full min-h-96">
                            <div className="w-full h-96 lg:h-full">
                                <Lanyard position={[0, 0, 18]} fov={13} />
                            </div>
                        </div>

                        {/* Right - Content (3 Columns Span) */}
                        <div className="lg:col-span-3 flex flex-col gap-6 pt-4 lg:pt-0">
                            {/* Heading */}
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                    {aboutStrings.title.split(' ').slice(0, 1).join(' ')}<span className="text-orange-400"> {aboutStrings.title.split(' ').slice(1).join(' ')}</span>
                                </h2>
                            </div>

                            {/* Subtitle with Border */}
                            <div className="border-l-4 border-orange-400 pl-4">
                                <p className="text-gray-300 text-lg italic" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                    {aboutStrings.subtitle}
                                </p>
                            </div>

                            {/* Description Paragraphs */}
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p style={{ fontFamily: "'Outfit', sans-serif" }}>
                                    {aboutStrings.description1}
                                </p>
                                <p style={{ fontFamily: "'Outfit', sans-serif" }}>
                                    {aboutStrings.description2}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 pt-4">
                                <div className="text-center">
                                    <SlotMachineNumber value="3+" />
                                    <p className="text-gray-400 text-sm uppercase tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>{aboutStrings.experience}</p>
                                </div>
                                <div className="text-center">
                                    <SlotMachineNumber value="20+" />
                                    <p className="text-gray-400 text-sm uppercase tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>{aboutStrings.projects}</p>
                                </div>
                                <div className="text-center">
                                    <SlotMachineNumber value="10+" />
                                    <p className="text-gray-400 text-sm uppercase tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>{aboutStrings.clients}</p>
                                </div>
                            </div>

                            {/* Download CV Button */}
                            <div className="pt-4">
                                <a
                                    href="/Resume.pdf"
                                    download
                                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-orange-400/60 text-orange-300 font-bold rounded-full hover:bg-orange-400/10 transition-all" style={{ fontFamily: "'Outfit', sans-serif" }}
                                >
                                    {aboutStrings.downloadCv}
                                    <MdDownload size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
