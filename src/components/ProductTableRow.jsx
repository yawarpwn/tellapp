import { useState } from 'react'
import { DeleteIcon, EditIcon } from '../icons'
import Button from '../atoms/Button'
import Modal from '../atoms/Modal'
import Chip from '../atoms/Chip'

export default function ProductTableRow({
  product,
  index,
  onEditProduct,
  onDeleteProduct,
}) {
  const { description, code, unit_size, price, id } = product
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
      <tr className={`${index % 2 ? 'bg-foreground-100' : ''}`}>
        <td className="px-3 font-normal py-2 text-sm">
          <p className='w-[200px] md:w-full'>
          {description}
          </p>
        </td>
        <td>
          <span className='inline-block border border-secondary text-[0.7rem] px-1 py-1 text-center w-[90px] h-[30px] rounded-lg font-semibold'>{code}</span>
        </td>

        <td className='table-td'>
          <p className='text-center'>{unit_size}</p>
        </td>

        <td className='table-td'>
          <p>{price}</p>
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
          <div className="flex items-center p-4 gap-4 justify-between">
            <Button onClick={handleDeleteProduct}>Ok</Button>
            <Button
              color="danger"
              onClick={handleCloseConfirm}
            >
              cancel
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
