import Aurora from "@/components/ui/Aurora"
import { Hero } from "@/components/sections/hero/Hero"
import { About } from "@/components/sections/about/About"
import TechStack from "@/components/sections/about/TechStack"
import Certifications from "@/components/sections/about/Certifications"
import { Projects } from "@/components/sections/projects/Projects"
import { Contact } from "@/components/sections/contact/Contact"

export default function LocalePage() {
    return (
        <>
            <Aurora colorStops={['#FFB366', '#FF8C42', '#FFD9B3']} amplitude={0.8} blend={0.6} />
            <main className="relative z-10 w-full">
                <Hero />
                <About />
                <TechStack />
                <Certifications />
                <Projects />
                <Contact />
            </main>
        </>
    )
}
