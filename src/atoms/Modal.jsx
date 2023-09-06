import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { XIcon } from '../icons'

export default function Modal({
  isOpen,
  onClose,
  children,
  size = 'xl',
  title = 'Default title',
  maxHeight,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    isOpen &&
    createPortal(
      <div tabIndex={-1}>
        <div className="z-50 fixed inset-0 bg-black/50 backdrop-blur"></div>
        <div
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              onClose()
            }
          }}
          className="z-50 fixed inset-0 flex items-center justify-center p-2"
        >
          <section
            style={{
              maxHeight,
            }}
            className={clsx(
              'max-w-xl bg-content1 w-full rounded-lg shadow-md p-4 flex flex-col gap-4 h-full  overflow-y-auto',
              {
                'max-w-xl': size === 'xl',
                'max-w-md': size === 'md',
                'max-w-lg': size === 'lg',
                'max-w-xs': size === 'xs',
              }
            )}
          >
            <header className="flex items-center justify-between">
              <h2 className="font-bold text-xl">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-content4 rounded-full"
              >
                <XIcon />
              </button>
            </header>
            {children}
          </section>
        </div>
      </div>,
      document.body
    )
  )
}
