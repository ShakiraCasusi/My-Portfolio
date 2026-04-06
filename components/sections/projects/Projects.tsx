import "./Projects.css";

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
        title: "Project One",
        description: "A brief description of your project",
        image: "/pictures/project1.jpg",
        stack: ["React", "TypeScript", "Tailwind"],
        viewLink: "#project1"
    },
    {
        id: 2,
        title: "Project Two",
        description: "Another amazing project you created",
        image: "/pictures/project2.jpg",
        stack: ["Next.js", "PostgreSQL", "Vercel"],
        viewLink: "#project2"
    },
    {
        id: 3,
        title: "Project Three",
        description: "Showcase of your creative skills",
        image: "/pictures/project3.jpg",
        stack: ["Vue.js", "Node.js", "MongoDB"],
        viewLink: "#project3"
    },
];

export function Projects() {
    return (
        <section id="projects" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
            <div className="w-full max-w-6xl">
                {/* Title */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        <span className="text-white">Selected</span>{" "}
                        <span className="text-orange-500">Projects</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Some works that highlight my expertise.
                    </p>
                </div>

                {/* Projects Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="project-card group relative overflow-hidden rounded-lg h-64 cursor-pointer"
                        >
                            {/* Blurred Image Background */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover project-image blur-sm group-hover:blur-none transition-all duration-300"
                            />

                            {/* Overlay with Details */}
                            <div className="project-overlay absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
