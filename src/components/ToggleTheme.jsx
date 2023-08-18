import { useEffect, useState } from "react"
import { SunIcon, MoonIcon } from "../icons"
export default function ToggleTheme() {

  const getTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      return 'dark'
    } else {
      return 'light'
    }
  }

  const [theme, setTheme] = useState(getTheme())
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      root.classList.remove('dark')
      localStorage.theme = 'light'
    }

  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div>
      <button className="p-2 hover:bg-foreground-100 rounded-full outline-none" onClick={toggleTheme}>
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  )
}
