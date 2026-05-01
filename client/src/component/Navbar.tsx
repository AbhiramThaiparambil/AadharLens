import { FileText } from 'lucide-react'
import ThemeController from './ThemeController'
import { Link } from 'react-router-dom'
export interface NavLink {
    label: string
    href: string
    tag: "a" | "link"
}

export interface NavbarProps {
    links: NavLink[] | []
}
const Navbar = ({ links }: NavbarProps) => {
    return (

        <nav className="sticky top-0 z-50 bg-base/80 backdrop-blur-md border-b border-secondary">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                        <FileText className="text-base w-5 h-5" />
                    </div>
                    <span className="text-xl font-semibold tracking-tight text-primary">
                        AadharLens
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8 font-medium text-primary">
                    {links.map((navLink, index) =>
                        navLink.tag === "a" ? (
                            <a
                                key={index}
                                href={navLink.href}
                                className="hover:text-secondary transition-colors"
                            >
                                {navLink.label}
                            </a>
                        ) : (
                            <Link
                                key={index}
                                to={navLink.href}
                                className="hover:text-secondary transition-colors"
                            >
                                {navLink.label}
                            </Link>
                        )
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <ThemeController />



                    <Link to="/home">
                        <button className="bg-primary text-base px-5 py-2 rounded-full font-semibold hover:bg-accent hover:text-primary transition-all duration-300 shadow-sm">
                            Get Started
                        </button>
                    </Link>
                </div>

            </div>
        </nav>

    )
}

export default Navbar