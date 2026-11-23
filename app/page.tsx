import Aurora from "@/components/ui/Aurora"
import { Hero } from "@/components/sections/hero/Hero"
import { About } from "@/components/sections/about/About"
import { Skills } from "@/components/sections/skills/Skills"
import Certifications from "@/components/sections/about/Certifications"
import { Projects } from "@/components/sections/projects/Projects"
import { Contact } from "@/components/sections/contact/Contact"
import { Navbar } from "@/components/layout/Navbar"

export default function Home() {
    return (
        <>
            <Navbar />
            <Aurora colorStops={['#FFB366', '#FF8C42', '#FFD9B3']} amplitude={0.8} blend={0.6} />
            <main className="relative z-10 w-full">
                <Hero />
                <About />
                <Skills />
                <Certifications />
                <Projects />
                <Contact />
            </main>
        </>
    )
}
