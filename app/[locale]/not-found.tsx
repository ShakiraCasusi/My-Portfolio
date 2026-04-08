import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-orange-400 mb-4">404</h1>
                <p className="text-xl text-gray-300 mb-8">Page not found</p>
                <Link
                    href="/en"
                    className="inline-block px-6 py-3 bg-orange-400 text-black rounded-lg hover:bg-orange-500 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
