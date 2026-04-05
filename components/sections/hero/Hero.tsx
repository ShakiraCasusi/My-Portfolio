export function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20"
        >
            <div className="w-full max-w-6xl">
                <div className="text-center">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                        Welcome to My Portfolio
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Hero section content coming soon
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition">
                        Get Started
                    </button>
                </div>
            </div>
        </section>
    )
}
