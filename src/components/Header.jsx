import Logo from "../atoms/Logo"
import ToggleTheme from "./ToggleTheme"
function Header() {
  return (
    <header className='h-16 top-0'>
      <div className='h-full w-full flex items-center'>
        <div className="flex flex-1 gap-x-2 items-center">
          <Logo />
          <span className="text-2xl font-extrabold">
            APP
          </span>
        </div>
        <ToggleTheme />
      </div>
    </header>
  )
}

export default Header
