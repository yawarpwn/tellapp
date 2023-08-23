import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'

export default function Modal({ isOpen, onClose, children, size = 'xl' }) {
  useEffect(() => {
    console.log('modal Effect')
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
            className={clsx(
              'max-w-xl bg-content1 w-full rounded-lg shadow-md p-4',
              size === 'lg' && 'max-w-xl',
              size === 'xs' && 'max-w-xs',
            )}
          >
            {children}
          </section>
        </div>
      </div>,
      document.body,
    )
  )
}
