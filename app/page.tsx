import { MeshGradientBackground } from "@/components/ui/MeshGradientBackground"
import { Hero } from "@/components/sections/hero/Hero"
import { About } from "@/components/sections/about/About"
import { Skills } from "@/components/sections/skills/Skills"
import { Projects } from "@/components/sections/projects/Projects"
import { Contact } from "@/components/sections/contact/Contact"

export default function Home() {
    return (
        <MeshGradientBackground>
            <main className="relative w-full">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>
        </MeshGradientBackground>
    )
}
