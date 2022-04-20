import { BsFillMoonStarsFill } from 'react-icons/bs'
import { useTheme } from 'next-themes'

export default function DarkMode({ className }) {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        if (theme === 'dark-theme') {
            setTheme('light')
        } else {
            setTheme('dark-theme')
        }
    }

    return (
        <div className={`${className} mr-5 text-lg cursor-pointer`}>
            {theme === 'dark-theme' && (
                <BsFillMoonStarsFill
                    onClick={() => {
                        toggleTheme()
                    }}
                    className="text-yellow-500 '"
                />
            )}
            {theme === 'light' && (
                <BsFillMoonStarsFill
                    onClick={() => {
                        toggleTheme()
                    }}
                    className="text-gray-500 '"
                />
            )}
            {theme === 'system' && (
                <BsFillMoonStarsFill
                    onClick={() => {
                        toggleTheme()
                    }}
                    className="text-gray-500 '"
                />
            )}
        </div>
    )
}
