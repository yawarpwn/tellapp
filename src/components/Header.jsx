import Logo from '../atoms/Logo'
import ToggleTheme from './ToggleTheme'
import { Link } from 'wouter'
import { ProductsIcon, HomeIcon, PrinterIcon } from '../icons'
function Header() {
  const navs = [
    {
      title: 'Cotizaciones',
      href: '/',
      icon: HomeIcon,
    },
    {
      title: 'Productos',
      href: '/productos',
      icon: ProductsIcon,
    },
    {
      title: 'Rotulos',
      href: 'rotulos',
      icon: PrinterIcon,
    },
  ]
  return (
    <header className="h-16 top-0">
      <div className="h-full w-full flex items-center">
        <div className="flex flex-1 gap-x-2 items-center">
          <Logo />
          <span className="text-2xl font-extrabold">APP</span>
        </div>
        <div className="flex gap-3 items-center">
          <nav>
            <ul className="flex gap-2 items-center">
              {navs.map(({ href, title, icon: Icon }) => (
                <li key={title}>
                  <Link href={href}>{Icon}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <ToggleTheme />
        </div>
      </div>
    </header>
  )
}

export default Header
