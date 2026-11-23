import Image from "next/image"
import { Award } from "lucide-react"

interface Certification {
    id: string
    title: string
    description: string
    issuer: string
    date: string
    image: string
}

const certifications: Certification[] = [
    {
        id: "canva-social-design",
        title: "How to Design Facebook and IG Stories Using Canva",
        issuer: "Coursera",
        date: "2024",
        image: "/pictures/How to Design FB and IG.jpeg",
        description:
            "Practiced creating polished social media stories with Canva layouts, visual hierarchy, and platform-ready design.",
    },
    {
        id: "ux-foundations",
        title: "Foundations of User Experience (UX) Design",
        issuer: "Google via Coursera",
        date: "2024",
        image: "/pictures/Foundations of UX.jpg",
        description:
            "Studied user-centered design, accessibility, equity-focused design, and the end-to-end UX process.",
    },
    {
        id: "ux-process",
        title: "Start the UX Design Process",
        issuer: "Google via Coursera",
        date: "2024",
        image: "/pictures/UX Design Process.jpg",
        description:
            "Learned to research user needs and pain points, then translate findings into clear design opportunities.",
    },
    {
        id: "wireframes-prototypes",
        title: "Build Wireframes and Low-Fidelity Prototypes",
        issuer: "Google via Coursera",
        date: "2024",
        image: "/pictures/Build Wireframes.jpg",
        description:
            "Practiced turning user needs into storyboards, wireframes, and low-fidelity prototype concepts.",
    },
    {
        id: "cybersecurity",
        title: "Introduction to Cybersecurity",
        issuer: "Cisco Networking Academy",
        date: "2025",
        image: "/pictures/Cybersec Fundamentals.jpg",
        description:
            "Covered cybersecurity fundamentals, common digital threats, and practices for protecting information.",
    },
    {
        id: "aws-cloud-foundations",
        title: "AWS Cloud Foundations",
        issuer: "AWS Academy",
        date: "2026",
        image: "/pictures/Cloud Foundations.jpg",
        description:
            "Studied core cloud concepts, foundational AWS services, cloud architecture, and security considerations.",
    },
]

export default function Certifications() {
    return (
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <header className="mb-12 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                        Learning &amp; growth
                    </p>
                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                        Certifications
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
                        Courses and credentials that continue to shape my design and technology practice.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...certifications].reverse().map((certification) => (
                        <article
                            key={certification.id}
                            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/75 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-orange-400/30 hover:shadow-orange-950/20"
                        >
                            <div className="relative aspect-video overflow-hidden bg-[#080611]">
                                <Image
                                    src={certification.image}
                                    alt={`${certification.title} certificate`}
                                    fill
                                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-orange-200 backdrop-blur-md">
                                    <Award size={14} aria-hidden="true" />
                                    Certificate
                                </span>
                            </div>

                            <div className="flex flex-1 flex-col p-5 sm:p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-lg font-semibold leading-snug text-white">
                                        {certification.title}
                                    </h3>
                                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-gray-400">
                                        {certification.date}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm font-medium text-orange-200">
                                    {certification.issuer}
                                </p>
                                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">
                                    {certification.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
