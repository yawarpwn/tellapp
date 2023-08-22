import ToggleTheme from './ToggleTheme'
import { Link } from 'wouter'
import { ProductsIcon,  PrinterIcon, QuotationIcon } from '../icons'
function Header() {
  const navs = [
    {
      title: 'Cotizaciones',
      href: '/',
      icon: QuotationIcon,
    },
    {
      title: 'Productos',
      href: '/productos',
      icon: ProductsIcon,
    },
    {
      title: 'Rotulos',
      href: '/rotulos',
      icon: PrinterIcon,
    },
  ]
  return (
    <header className="h-16 top-0">
      <div className="h-full w-full flex items-center">
        <nav className="flex-1">
          <ul className="flex gap-2 items-center">
            {navs.map(({ href, title, icon: Icon }) => (
              <li
                key={title}
                className="p-2  rounded-lg hover:bg-content2"
              >
                <Link href={href}>
                  <a>
                    <Icon />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex gap-3 items-center">
          <ToggleTheme />
        </div>
      </div>
    </header>
  )
}

export default Header
