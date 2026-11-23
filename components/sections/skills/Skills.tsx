const skillGroups = [
    {
        title: "Web Development",
        skills: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    },
    {
        title: "Backend & Cloud",
        skills: ["Node.js", "Express.js", "AWS", "AWS S3", "Helmet.js"],
    },
    {
        title: "Data & Analytics",
        skills: ["Tableau"],
    },
    {
        title: "UI/UX & Visual Design",
        skills: ["Figma", "Canva", "CapCut"],
    },
    {
        title: "Tools & Version Control",
        skills: ["Git", "GitHub"],
    },
    {
        title: "Emerging Technology",
        skills: ["AI Engineering"],
    },
]

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
                            <h3 className="mb-5 text-lg font-semibold text-white">
                                {group.title}
                            </h3>
                            <ul className="flex flex-wrap gap-2.5">
                                {group.skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-3.5 py-2 text-sm font-medium text-orange-100"
                                    >
                                        {skill}
                                        {skill === "Helmet.js" && (
                                            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-gray-300">
                                                Beginner
                                            </span>
                                        )}
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
