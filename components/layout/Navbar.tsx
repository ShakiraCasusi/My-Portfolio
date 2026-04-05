export function Navbar() {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-md">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <a href="#" className="text-2xl font-bold text-white">
                            Portfolio
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#hero" className="text-gray-400 hover:text-white transition">
                                Home
                            </a>
                            <a href="#about" className="text-gray-400 hover:text-white transition">
                                About
                            </a>
                            <a href="#skills" className="text-gray-400 hover:text-white transition">
                                Skills
                            </a>
                            <a href="#projects" className="text-gray-400 hover:text-white transition">
                                Projects
                            </a>
                            <a href="#contact" className="text-gray-400 hover:text-white transition">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
