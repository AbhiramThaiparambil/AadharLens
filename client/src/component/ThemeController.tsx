import { useEffect, useState } from "react"

const ThemeController = () => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "light"
    )

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }

        localStorage.setItem("theme", newTheme)
        setTheme(newTheme)
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative w-16 h-8 flex items-center bg-secondary rounded-full p-1 transition-colors duration-300"
        >
            <div
                className={`w-6 h-6 bg-accent rounded-full shadow-md transform transition-transform duration-300 ${theme === "dark" ? "translate-x-8" : "translate-x-0"
                    }`}
            />

            <span className="absolute left-2 text-xs">
                ☀️
            </span>
            <span className="absolute right-2 text-xs">
                🌙
            </span>
        </button>
    )
}

export default ThemeController