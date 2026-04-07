import "./Projects.css";
import { useTranslations } from 'next-intl';

interface ProjectCard {
    id: number;
    title: string;
    description: string;
    image: string;
    stack: string[];
    viewLink: string;
}

const projects: ProjectCard[] = [
    {
        id: 1,
        title: "Re;Read",
        description: "Re;Read is an online platform for buying and selling second-hand books. It gives students and readers access to quality and affordable books.",
        image: "/pictures/Screenshot 2026-04-07 154955.png",
        stack: ["HTML", "CSS", "JS", "BOOTSTRAP", "MongoDB"],
        viewLink: "https://reread-1.onrender.com/"
    },
    {
        id: 2,
        title: "loT Logistics Monitoring Dashboard",
        description: "This school project is an IoT project that collects/cleans sensor data (e.g., temperature, humidity, shock) and presents it through analyses and dashboards for monitoring conditions in transit.",
        image: "/pictures/Tableau.png",
        stack: ["HTML", "Jupyter Notebook", "Tableau"],
        viewLink: "#project2"
    },
    {
        id: 3,
        title: "MotorPH Sales Dashboard",
        description: " A school project where MotorPH’s Business Analysis Report is a data-driven 2025 study showing that the company has stable sales, diverse inventory, and strong readiness to expand into physical stores across the Philippines.",
        image: "/pictures/Screenshot 2026-04-07 162859.png",
        stack: ["Google Worksheets"],
        viewLink: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSf9pdXIjBNbttqoG829u0XZzaPNQqXeIEwKgjyYjB6lwPS9koRdJUu9Y49x0GrBO3Pr1BWozHYusx7/pubhtml?gid=33346753&single=true"
    },
];

export function Projects() {
    const t = useTranslations('projects')
    return (
        <section id="projects" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div className="w-full max-w-6xl">
                {/* Title */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        <span className="text-white">{t('titlePrefix')}</span>{" "}
                        <span className="text-orange-500">{t('titleSuffix')}</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Projects Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card group relative h-64 cursor-pointer rounded-lg overflow-hidden"
                        >
                            {/* Image */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-contain bg-gray-900"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 rounded-lg bg-black/90 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-xl font-bold text-white text-center mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-gray-300 text-center mb-4">
                                    {project.description}
                                </p>

                                {/* Stack Tags */}
                                <div className="flex flex-wrap gap-2 justify-center mb-4">
                                    {project.stack.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 text-xs font-medium text-orange-400 border border-orange-400/50 bg-orange-400/10 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* View Link */}
                                <a
                                    href={project.viewLink}
                                    className="text-orange-500 hover:text-orange-400 font-semibold text-sm transition-colors"
                                >
                                    View Project →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Projects Button */}
                <div className="flex justify-center">
                    <button className="px-8 py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all duration-300 hover:border-orange-500">
                        View All Projects
                    </button>
                </div>
            </div>
        </section>
    );
}
