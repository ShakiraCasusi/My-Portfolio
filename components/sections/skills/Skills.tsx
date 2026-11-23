import Image from "next/image"
import { Bot, ShieldCheck, Sparkles } from "lucide-react"
import styles from "./Skills.module.css"

type Skill = {
    name: string
    devicon?: string
    imageUrl?: string
    whiteIcon?: boolean
    customIcon?: "security" | "ai" | "prompt"
}

type SkillGroup = {
    title: string
    rating: string
    description: string
    skills: Skill[]
}

const skillGroups: SkillGroup[] = [
    {
        title: "UI & Visual Design",
        rating: "Proficient / Core Strength",
        description:
            "Confident in crafting user-centered interfaces, cohesive brand visuals, and engaging multimedia content from concept to final design.",
        skills: [
            { name: "Figma", devicon: "devicon-figma-plain" },
            { name: "Canva", devicon: "devicon-canva-plain" },
            {
                name: "CapCut",
                imageUrl:
                    "https://sf16-web-tos-buz.capcutstatic.com/obj/capcut-web-buz-sg/common/images/lv_web-2.ico",
            },
            { name: "Adobe Photoshop", devicon: "devicon-photoshop-plain" },
        ],
    },
    {
        title: "Data Analytics & Productivity",
        rating: "Working Knowledge",
        description:
            "Capable of organizing workflows, managing documentation, and building clean data visualizations for academic and project needs.",
        skills: [
            {
                name: "Tableau",
                imageUrl:
                    "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tableau.svg",
                whiteIcon: true,
            },
            { name: "Notion", imageUrl: "https://cdn.simpleicons.org/notion/ffffff" },
            { name: "Google Docs", imageUrl: "https://cdn.simpleicons.org/googledocs/ffffff" },
            { name: "Google Sheets", imageUrl: "https://cdn.simpleicons.org/googlesheets/ffffff" },
            { name: "Google Slides", imageUrl: "https://cdn.simpleicons.org/googleslides/ffffff" },
            { name: "Google Drive", imageUrl: "https://cdn.simpleicons.org/googledrive/ffffff" },
        ],
    },
    {
        title: "Tools, Version Control & Social Platforms",
        rating: "Working Knowledge",
        description:
            "Experienced in collaborative code management, repository version control, and managing digital content across social platforms.",
        skills: [
            { name: "Git", devicon: "devicon-git-plain" },
            { name: "GitHub", devicon: "devicon-github-original" },
            { name: "Meta", imageUrl: "https://cdn.simpleicons.org/meta/ffffff" },
            { name: "Facebook", imageUrl: "https://cdn.simpleicons.org/facebook/ffffff" },
            { name: "Instagram", imageUrl: "https://cdn.simpleicons.org/instagram/ffffff" },
            { name: "TikTok", imageUrl: "https://cdn.simpleicons.org/tiktok/ffffff" },
            { name: "YouTube", imageUrl: "https://cdn.simpleicons.org/youtube/ffffff" },
        ],
    },
    {
        title: "Web Development",
        rating: "Foundational / AI-Assisted",
        description:
            "Built responsive web layouts for academic projects using core frontend technologies supported by AI-assisted development workflows.",
        skills: [
            { name: "HTML", devicon: "devicon-html5-plain" },
            { name: "CSS", devicon: "devicon-css3-plain" },
            { name: "Bootstrap", devicon: "devicon-bootstrap-plain" },
            { name: "JavaScript", devicon: "devicon-javascript-plain" },
        ],
    },
    {
        title: "Backend & Cloud",
        rating: "Foundational / AI-Assisted",
        description:
            "Familiar with server-side routing, basic security middleware, and cloud storage integration through hands-on school projects.",
        skills: [
            { name: "Node.js", devicon: "devicon-nodejs-plain" },
            { name: "Express.js", devicon: "devicon-express-original" },
            { name: "AWS (S3)", devicon: "devicon-amazonwebservices-plain" },
            { name: "Helmet.js", customIcon: "security" },
        ],
    },
    {
        title: "Emerging Technology",
        rating: "Active Practice",
        description:
            "Actively leveraging prompt engineering and AI tools to accelerate coding, problem-solving, and creative production.",
        skills: [
            { name: "AI Engineering", customIcon: "ai" },
            { name: "Prompt Engineering", customIcon: "prompt" },
        ],
    },
]

function SkillIcon({ skill }: { skill: Skill }) {
    if (skill.devicon) {
        return <i className={`${skill.devicon} ${styles.devicon}`} aria-hidden="true" />
    }

    if (skill.imageUrl) {
        return (
            <Image
                className={`${styles.imageIcon} ${skill.whiteIcon ? styles.whiteIcon : ""}`}
                src={skill.imageUrl}
                alt=""
                width={28}
                height={28}
                unoptimized
                loading="lazy"
                aria-hidden="true"
            />
        )
    }

    if (skill.customIcon === "security") {
        return <ShieldCheck className={styles.customIcon} aria-hidden="true" />
    }

    if (skill.customIcon === "ai") {
        return <Bot className={styles.customIcon} aria-hidden="true" />
    }

    return <Sparkles className={styles.customIcon} aria-hidden="true" />
}

export function Skills() {
    return (
        <section id="skills" className="relative px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <header className="mb-12 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                        My toolkit
                    </p>
                    <h2 className="text-4xl font-bold text-white sm:text-5xl">
                        Creative <span className="text-orange-400">&amp; Tech Stack</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
                        A growing mix of technologies and creative tools I use to build, analyze, and design.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {skillGroups.map((group) => (
                        <article
                            key={group.title}
                            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-colors hover:border-orange-400/30 hover:bg-white/[0.06]"
                        >
                            <h3 className="text-lg font-semibold text-white">
                                {group.title}
                            </h3>
                            <span className="mt-3 inline-flex w-fit rounded-full border border-orange-400/20 bg-orange-400/10 px-2.5 py-1 text-xs font-medium text-orange-200">
                                {group.rating}
                            </span>
                            <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">
                                {group.description}
                            </p>
                            <ul className={`${styles.skillList} mt-5`}>
                                {group.skills.map((skill) => (
                                    <li key={skill.name} className={styles.skillItem}>
                                        <span
                                            className={styles.skillIcon}
                                            data-tooltip={skill.name}
                                            title={skill.name}
                                            role="img"
                                            aria-label={skill.name}
                                            tabIndex={0}
                                        >
                                            <SkillIcon skill={skill} />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
