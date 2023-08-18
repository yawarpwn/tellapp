export default function Button({ children, color = 'primary', ...props }) {
  const COLORS = {
    primary: 'bg-blue-500',
    secondary: 'border border-foreground-500 text-foreground-900',
    danger: 'bg-red-500'
  }
  return (
    <button
      className={`font-normal min-w-[80px] h-[40px] px-4 text-sm ${COLORS[color]} rounded-md whitespace-nowrap inline-flex items-center justify-center outline-none text-white `}
      {...props}
    >
      {children}
    </button>
  )
}
