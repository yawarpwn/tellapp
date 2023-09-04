import { ChevronDobleRightIcon } from '../icons'
import clsx from 'clsx'
export default function Pagination({
  totalPages,
  updatePage,
  currentPage,
  onNextPage,
}) {
  // Limitar el número máximo de páginas visibles a la vez
  const maxVisiblePages = 3

  // Calcular el rango de páginas a mostrar alrededor de la página actual
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2)
  let startPage = Math.max(currentPage - halfMaxVisiblePages, 1)
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

  // Ajustar el inicio si estamos cerca del final
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1)
  }

  const pagesArray = Array.from({ length: endPage - startPage + 1 }).map(
    (_, index) => startPage + index
  )

  return (
    <nav className="p-2.5 flex justify-center">
      <ul className="flex items-center gap-2 h-fit overflow-x-auto">
        {startPage > 1 && (
          <li onClick={() => updatePage(1)}>
            <span className="bg-default-100 text-default-foreground w-9 h-9 rounded-md flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white">
              1
            </span>
          </li>
        )}

        {startPage > 2 && (
          <li>
            <span className="bg-default-100 text-default-foreground w-9 h-9 rounded-md flex items-center justify-center cursor-pointer">
              ...
            </span>
          </li>
        )}

        {pagesArray.map((page) => (
          <li
            key={page}
            onClick={() => updatePage(page)}
          >
            <span
              className={clsx(
                'bg-default-100 text-default-foreground w-9 h-9 rounded-md flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white',
                {
                  'bg-primary text-white': currentPage === page,
                }
              )}
            >
              {page}
            </span>
          </li>
        ))}

        {endPage < totalPages - 1 && (
          <li>
            <span className="bg-default-100 text-default-foreground w-9 h-9 rounded-md flex items-center justify-center cursor-pointer">
              ...
            </span>
          </li>
        )}

        {endPage < totalPages && (
          <li onClick={() => updatePage(totalPages)}>
            <span className="bg-default-100 text-default-foreground w-9 h-9 rounded-md flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white">
              {totalPages}
            </span>
          </li>
        )}

        <li
          onClick={onNextPage}
          className="bg-default-100 text-default-foreground w-9 h-9 rounded-md flex items-center justify-center cursor-pointer hover:bg-default-200"
        >
          <ChevronDobleRightIcon size={15} />
        </li>
      </ul>
    </nav>
  )
}
