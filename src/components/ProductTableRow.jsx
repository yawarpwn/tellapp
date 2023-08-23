import { useState } from 'react'
import { DeleteIcon, EditIcon } from '../icons'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import { CATEGORIES } from '../contants'
import clsx from 'clsx'

export default function ProductTableRow({
  product,
  index,
  onEditProduct,
  onDeleteProduct,
}) {
  const { description, code, unit_size, price, id, category, cost } = product
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false)

  const handleDeleteProduct = () => {
    onDeleteProduct(id)
    setIsModalConfirmOpen(false)
  }

  const handleCloseConfirm = () => {
    setIsModalConfirmOpen(false)
  }

  return (
    <>
      <tr className={`${index % 2 ? 'bg-foreground-200' : ''}`}>
        <td className="px-3 font-normal py-2 text-sm">
          <p className="w-[200px] md:w-full">{description}</p>
        </td>
        <td>
          <span className="inline-block text-[0.7rem] px-1 py-1 text-center w-[90px] h-[30px]">
            {code}
          </span>
        </td>

        <td>
          <span
            className={clsx(
              'inline-block text-[0.7rem] px-1 py-1 text-center w-[120px] h-[30px] border-r  rounded',
              category === 'proteccion vial' && 'bg-amber-200 text-amber-800',
              category === 'cintas seguridad' && 'bg-teal-200 text-teal-800',
              category === 'obras' && 'bg-orange-200 text-orange-800',
              category === 'seguridad' && 'bg-green-200 text-green-800',
              category === 'fotoluminiscente' &&
                'bg-yellow-200 text-yellow-800',
              category === 'viales' && 'bg-lime-200 text-lime-800',
              category === 'lucha contra incendio' && 'bg-red-200 text-red-800',
              category === 'articulos seguridad' &&
                'bg-fuchsia-200 text-fuchsia-800',
              category === 'epp' && 'bg-indigo-200 text-indigo-800',
              category === 'viniles' && 'bg-violet-200 text-violet-800',
              category === 'ropa seguridad' && 'bg-rose-200 text-rose-800',
            )}
          >
            {category}
          </span>
        </td>

        <td className="table-td">
          <p className="text-center">{unit_size}</p>
        </td>

        <td className="table-td">
          <p>{cost.toFixed(2)}</p>
        </td>

        <td className="table-td">
          <p>{price.toFixed(2)}</p>
        </td>
        <td>
          <button onClick={() => onEditProduct(product)}>
            <EditIcon />
          </button>
          <button onClick={() => setIsModalConfirmOpen(true)}>
            <DeleteIcon />
          </button>
        </td>
      </tr>
      {isModalConfirmOpen && (
        <Modal
          isOpen={isModalConfirmOpen}
          onClose={handleCloseConfirm}
          size="xs"
        >
          <div className="flex flex-col gap-2 justify-center">
            <p className='text-center text-danger font-medium'>Confirmar Eliminar Producto:</p>
            <p className='text-center'>{description}</p>
            <div className='flex items-center p-4 gap-4 justify-between'>
            <Button onClick={handleDeleteProduct}>Ok</Button>
            <Button
              color="danger"
              onClick={handleCloseConfirm}
            >
              cancel
            </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
