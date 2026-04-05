'use client'

import { ScrollingText, TypingEffect, SocialIcons } from './HeroHelpers'
import { MdArrowOutward } from 'react-icons/md'
import ProfileCard from '@/components/ui/ProfileCard'

export function Hero() {
    const description = "Transforming ideas into high-impact digital experiences. Specialist in UI/UX, Web Dev, and Content Strategy. I create functional art for the modern web—from the first pixel to the final edit."

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
        >
            <div className="w-full max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column */}
                    <div className="flex flex-col space-y-6">
                        {/* Greeting and Name */}
                        <div className="flex flex-col gap-0">
                            <p className="text-1xl lg:text-2xl font-normal text-gray-400 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Hello, I am
                            </p>
                            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-none tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Shakira Angela
                            </h1>
                            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-none tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Agudo Casusi
                            </h1>
                        </div>

                        {/* Role */}
                        <div className="flex items-center gap-3 pt-2 whitespace-nowrap">
                            <span className="text-gray-400 text-2xl lg:text-3xl font-bold leading-none tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>A</span>
                            <ScrollingText />
                        </div>

                        {/* Social Icons */}
                        <SocialIcons />

                        {/* Description with typing effect */}
                        <div className="pt-2 max-w-md">
                            <TypingEffect text={description} />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <a
                                href="#projects"
                                className="px-6 py-2.5 bg-orange-400/40 text-white font-bold text-sm border-2 border-orange-400/40 rounded-full transition-all hover:bg-orange-400/60 hover:border-orange-400/60 tracking-tight flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                View Projects
                                <MdArrowOutward size={16} />
                            </a>
                            <a
                                href="#contact"
                                className="px-6 py-2.5 text-gray-400 font-bold text-sm border-2 border-gray-400 rounded-full transition-all hover:text-white hover:border-white tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Contact Me
                            </a>
                        </div>
                    </div>

                    {/* Right Column - Profile Card */}
                    <div className="hidden lg:flex items-center justify-center">
                        <ProfileCard
                            avatarUrl="/pictures/464751278_567183799036449_3163974364779314123_n.jpg"
                            enableTilt={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
