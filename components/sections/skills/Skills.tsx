import { BrainCircuit, MessageSquareText, ShieldCheck } from "lucide-react"
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
    skills: Skill[]
    level?: string
    note?: string
}

const skillGroups: SkillGroup[] = [
    {
        title: "UI & Visual Design",
        skills: [
            { name: "Figma", devicon: "devicon-figma-plain" },
            { name: "Canva", devicon: "devicon-canva-plain" },
            {
                name: "CapCut",
                imageUrl: "https://sf16-web-tos-buz.capcutstatic.com/obj/capcut-web-buz-sg/common/images/lv_web-2.ico",
            },
            { name: "Adobe Photoshop", devicon: "devicon-photoshop-plain" },
        ],
    },
    {
        title: "Data Analytics & Productivity",
        skills: [
            {
                name: "Tableau",
                imageUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tableau.svg",
                whiteIcon: true,
            },
            { name: "Notion", imageUrl: "https://cdn.simpleicons.org/notion/ffffff" },
        ],
    },
    {
        title: "Web Development",
        level: "Foundational / AI-Assisted",
        note: "Foundational knowledge built through academic projects with AI-assisted development.",
        skills: [
            { name: "HTML", devicon: "devicon-html5-plain" },
            { name: "CSS", devicon: "devicon-css3-plain" },
            { name: "Bootstrap", devicon: "devicon-bootstrap-plain" },
            { name: "JavaScript", devicon: "devicon-javascript-plain" },
        ],
    },
    {
        title: "Backend & Cloud",
        level: "Foundational / AI-Assisted",
        note: "Foundational knowledge built through academic projects with AI-assisted development.",
        skills: [
            { name: "Node.js", devicon: "devicon-nodejs-plain" },
            { name: "Express.js", devicon: "devicon-express-original" },
            { name: "AWS (S3)", devicon: "devicon-amazonwebservices-plain" },
            { name: "Helmet.js", customIcon: "security" },
        ],
    },
    {
        title: "Tools & Version Control",
        skills: [
            { name: "Git", devicon: "devicon-git-plain" },
            { name: "GitHub", devicon: "devicon-github-original" },
        ],
    },
    {
        title: "Emerging Technology",
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
            <img
                className={`${styles.imageIcon} ${skill.whiteIcon ? styles.whiteIcon : ""}`}
                src={skill.imageUrl}
                alt=""
                width="28"
                height="28"
                loading="lazy"
                aria-hidden="true"
            />
        )
    }

    if (skill.customIcon === "security") {
        return <ShieldCheck className={styles.customIcon} aria-hidden="true" />
    }

    if (skill.customIcon === "ai") {
        return <BrainCircuit className={styles.customIcon} aria-hidden="true" />
    }

    return <MessageSquareText className={styles.customIcon} aria-hidden="true" />
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
                            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-colors hover:border-orange-400/30 hover:bg-white/[0.06]"
                        >
                            <h3 className="text-lg font-semibold text-white">
                                {group.title}
                            </h3>
                            {group.note && (
                                <div className="mt-3 space-y-2.5">
                                    <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-2.5 py-1 text-xs font-medium text-orange-200">
                                        {group.level}
                                    </span>
                                    <p className="text-sm leading-relaxed text-gray-400">
                                        {group.note}
                                    </p>
                                </div>
                            )}
                            <ul className={`${styles.skillList} ${group.note ? "mt-5" : "mt-6"}`}>
                                {group.skills.map((skill) => (
                                    <li key={skill.name} className={styles.skillItem}>
                                        <span
                                            className={styles.skillIcon}
                                            data-tooltip={skill.name}
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
