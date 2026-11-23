"use client"

import { useState } from "react"
import Image from "next/image"
import {
    ArrowUpRight,
    CalendarDays,
    ChartNoAxesCombined,
    ChevronDown,
    FileSpreadsheet,
    Target,
    WifiOff,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import "./Projects.css"

type ProjectMark =
    | { label: string; devicon: string }
    | { label: string; icon: LucideIcon }

interface Project {
    id: string
    title: string
    category: string
    description: string
    image: string
    imageAlt: string
    marks: ProjectMark[]
    viewLink?: string
}

const projects: Project[] = [
    {
        id: "roki",
        title: "Roki",
        category: "Web Development",
        description:
            "An offline-ready study companion for students, combining grade tracking, smart study planning, and focus-building habits.",
        image: "/pictures/ROKI.png",
        imageAlt: "Roki student planner and focus dashboard",
        marks: [
            { label: "Offline-ready", icon: WifiOff },
            { label: "Grade tracking", icon: ChartNoAxesCombined },
            { label: "Smart planning", icon: CalendarDays },
            { label: "Focus habits", icon: Target },
        ],
        viewLink: "https://rokistudy.vercel.app",
    },
    {
        id: "air-quality-ncr",
        title: "Air Quality, NCR PH 2025",
        category: "Data Analytics",
        description:
            "A Tableau dashboard exploring Metro Manila's 2025 PM2.5 levels, WHO guideline exceedances, spatial distribution, seasonal trends, and zone-level patterns.",
        image: "/pictures/AIR Quality NCR.png",
        imageAlt: "Air Quality NCR dashboard showing PM2.5 trends and regional patterns",
        marks: [{ label: "Tableau", icon: ChartNoAxesCombined }],
    },
    {
        id: "climate-ready-philippines",
        title: "Climate Ready Philippines",
        category: "Visual Design",
        description:
            "A Canva-built interactive experience raising awareness of climate change impacts in the Philippines and sharing resilience-focused insights and solutions.",
        image: "/pictures/Climate Ready PH.png",
        imageAlt: "Climate Ready Philippines website homepage",
        marks: [{ label: "Canva", devicon: "devicon-canva-plain" }],
        viewLink: "https://shakiracasusi.my.canva.site/climate-ready-philippines",
    },
    {
        id: "reread",
        title: "Re;Read",
        category: "Web Development",
        description:
            "A second-hand book marketplace that helps students and readers find affordable, quality books.",
        image: "/pictures/ReRead.png",
        imageAlt: "Re;Read online bookstore homepage",
        marks: [
            { label: "HTML", devicon: "devicon-html5-plain" },
            { label: "CSS", devicon: "devicon-css3-plain" },
            { label: "JavaScript", devicon: "devicon-javascript-plain" },
            { label: "Bootstrap", devicon: "devicon-bootstrap-plain" },
            { label: "MongoDB", devicon: "devicon-mongodb-plain" },
        ],
        viewLink: "https://reread-1.onrender.com/",
    },
    {
        id: "iot-logistics",
        title: "IoT Logistics Monitoring Dashboard",
        category: "IoT / System Prototype",
        description:
            "An academic monitoring prototype that analyzes temperature, humidity, and shock sensor data to track package conditions in transit.",
        image: "/pictures/IoT Logistics Monitoring Dashboard.png",
        imageAlt: "IoT logistics dashboard showing temperature, humidity, and shock readings",
        marks: [
            { label: "HTML", devicon: "devicon-html5-plain" },
            { label: "Jupyter Notebook", devicon: "devicon-jupyter-plain" },
            { label: "Tableau", icon: ChartNoAxesCombined },
        ],
    },
    {
        id: "motorph-sales",
        title: "MotorPH Sales Dashboard",
        category: "Data Analytics",
        description:
            "A 2025 business analysis of MotorPH sales and inventory, highlighting the company's readiness to expand into physical stores across the Philippines.",
        image: "/pictures/MotorPH Sales Dashboard.png",
        imageAlt: "MotorPH sales dashboard with key metrics and sales trends",
        marks: [{ label: "Google Sheets", icon: FileSpreadsheet }],
        viewLink:
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vSf9pdXIjBNbttqoG829u0XZzaPNQqXeIEwKgjyYjB6lwPS9koRdJUu9Y49x0GrBO3Pr1BWozHYusx7/pubhtml?gid=33346753&single=true",
    },
]

const featuredProjects = projects.slice(0, 3)
const additionalProjects = projects.slice(3)

function ProjectCard({
    project,
    linkTabIndex = 0,
}: {
    project: Project
    linkTabIndex?: number
}) {
    return (
        <article className="project-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/75 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-orange-400/30 hover:shadow-orange-950/20">
            <div className="relative aspect-video overflow-hidden bg-[#080611]">
                <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-orange-200 backdrop-blur-md">
                    {project.category}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-xl font-semibold leading-snug text-white">
                    {project.title}
                </h3>
                <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-gray-400">
                    {project.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                    <ul
                        className="flex flex-wrap items-center gap-2"
                        aria-label="Project tools and highlights"
                    >
                        {project.marks.map((mark) => {
                            return (
                                <li key={mark.label}>
                                    <span
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-gray-300 transition-colors hover:border-orange-400/30 hover:text-orange-200"
                                        title={mark.label}
                                        aria-label={mark.label}
                                        role="img"
                                    >
                                        {"devicon" in mark ? (
                                            <i
                                                className={`${mark.devicon} text-base`}
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <mark.icon size={17} strokeWidth={1.8} aria-hidden="true" />
                                        )}
                                    </span>
                                </li>
                            )
                        })}
                    </ul>

                    {project.viewLink && (
                        <a
                            href={project.viewLink}
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={linkTabIndex}
                            aria-label={`View ${project.title}`}
                            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-orange-300 transition-colors hover:text-orange-200"
                        >
                            View project
                            <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                    )}
                </div>
            </div>
        </article>
    )
}

export function Projects() {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <section
            id="projects"
            className="relative flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-8"
        >
            <div className="w-full max-w-6xl">
                <header className="mb-12 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                        Selected work
                    </p>
                    <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
                        <span className="text-white">Selected</span>{" "}
                        <span className="text-orange-500">Projects</span>
                    </h2>
                    <p className="text-lg text-gray-400">
                        A selection of my web, design, and data projects.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {additionalProjects.length > 0 && (
                    <div
                        id="additional-projects"
                        className={`projects-extra${isExpanded ? " is-expanded" : ""}`}
                        aria-hidden={!isExpanded}
                        role="region"
                        aria-label="Additional projects"
                    >
                        <div className="projects-extra-inner">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {additionalProjects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        linkTabIndex={isExpanded ? 0 : -1}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {additionalProjects.length > 0 && (
                    <div className="mt-10 flex justify-center">
                        <button
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls="additional-projects"
                            onClick={() => setIsExpanded((expanded) => !expanded)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 font-medium text-white transition-colors hover:border-orange-400/60 hover:bg-orange-400/10"
                        >
                            {isExpanded ? "Show Less" : "View All Projects"}
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
