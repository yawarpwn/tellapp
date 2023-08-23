import clsx from 'clsx'
export default function Button({ children, color = 'primary', ...props }) {
  return (
    <button
      className={clsx(
        // Base
        `font-normal min-w-[80px] h-[40px] px-4 text-sm  rounded-md whitespace-nowrap inline-flex items-center justify-center outline-none`,
        color === 'primary' && 'bg-primary text-white',
        color === 'seconary' &&
          'border border-foreground-500 text-foreground-900',
        color === 'danger' && 'bg-danger text-white',
      )}
      {...props}
    >
      {children}
    </button>
  )
}
