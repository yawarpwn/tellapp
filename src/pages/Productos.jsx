import { useEffect, useState } from 'react'
import { getProducts, updateProduct } from '../services/supabase'
import { EditIcon } from '../icons'
import { ChevronDownIcon } from '../icons'
export default function ProductPage() {
  const [products, setProducts] = useState([])
  const [editingCell, setEditingCell] = useState(null)
  const [editedContent, setEditedContent] = useState('')

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.log('error fetching products', err))
  }, [])

  const handleCellEdit = ({ productId, field, initialContent }) => {
    setEditedContent(initialContent)
    setEditingCell({ productId, field })
  }

  const handleCellCancel = () => {
    setEditingCell(null)
    setEditedContent('')
  }

  const handleEditContent = (value) => {
    setEditedContent(value)
  }

  const handleBlurCell = () => {
    const { field, productId } = editingCell

    setProducts((prev) => {
      return prev.map((product) =>
        product.id === productId
          ? { ...product, [field]: editedContent }
          : product,
      )
    })
  }

  return (
    <div className="overflow-x-auto">
      <table
        aria-multiselectable="true"
        tabIndex={-1}
        className="w-full min-w-full h-auto table-auto "
      >
        <thead
          className="sticky top-0 left-0 z-10 bg-foreground-100"
          role="rowgroup"
        >
          <tr
            role="row"
            className="outline-none"
          >
            <th className="table-th">
              Descripcion
              <ChevronDownIcon
                size={16}
                className="inline-block ml-1 mb-px"
              />
            </th>

            <th className="table-th">
              Codigo
              <ChevronDownIcon
                size={16}
                className="inline-block ml-1 mb-px"
              />
            </th>
            <th className="table-th">
              U/M
              <ChevronDownIcon
                size={16}
                className="inline-block ml-1 mb-px"
              />
            </th>

            <th className="table-th">
              Precio
              <ChevronDownIcon
                size={16}
                className="inline-block ml-1 mb-px"
              />
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {products.map((product, index) => {
            return (
              <ProductTableRow
                product={product}
                key={index}
                index={index}
                editingCell={editingCell}
                editedContent={editedContent}
                onEditedContent={handleEditContent}
                onCellEdit={handleCellEdit}
                onBlurCell={handleBlurCell}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function ProductTableRow({
  product,
  editingCell,
  editedContent,
  onCellEdit,
  onCellSave,
  onCellCancel,
  onEditedContent,
  onBlurCell,
  index,
}) {
  const { description, code, unit_size, price, id } = product

  return (
    <tr className={`${index % 2 ? 'bg-foreground-50' : ''}`}>
      <td className="px-3 font-normal py-2 text-sm">
        {editingCell &&
        editingCell.productId === id &&
        editingCell.field === 'description' ? (
          <input
            value={editedContent}
            className="w-full px-3 py-2"
            autoFocus
            onChange={(e) => onEditedContent(e.target.value)}
            onBlur={onBlurCell}
          />
        ) : (
          <p
            onDoubleClick={() => {
              onCellEdit({
                productId: id,
                field: 'description',
                initialContent: description,
              })
            }}
            className="w-[200px] md:w-full"
          >
            {description}
          </p>
        )}
      </td>
      <td className="px-3 font-normal py-2 text-sm">
        {editingCell &&
        editingCell.productId === id &&
        editingCell.field === 'code' ? (
          <input
            value={editedContent}
            className="w-full px-3 py-2"
            autoFocus
            onChange={(e) => onEditedContent(e.target.value)}
            onBlur={onBlurCell}
          />
        ) : (
          <p
            onDoubleClick={() => {
              onCellEdit({
                productId: id,
                field: 'code',
                initialContent: code,
              })
            }}
          >
            {code}
          </p>
        )}
      </td>

      <td className="px-3 font-normal py-2 text-sm">
        {editingCell &&
        editingCell.productId === id &&
        editingCell.field === 'unit_size' ? (
          <input
            value={editedContent}
            className="w-full px-3 py-2"
            autoFocus
            onChange={(e) => onEditedContent(Number(e.target.value))}
            onBlur={onBlurCell}
          />
        ) : (
          <p
            onDoubleClick={() => {
              onCellEdit({
                productId: id,
                field: 'unit_size',
                initialContent: unit_size,
              })
            }}
          >
            {unit_size}
          </p>
        )}
      </td>

      <td className="px-3 font-normal py-2 text-sm">
        {editingCell &&
        editingCell.productId === id &&
        editingCell.field === 'price' ? (
          <input
            value={editedContent}
            className="w-full px-3 py-2"
            autoFocus
            onChange={(e) => onEditedContent(Number(e.target.value))}
            onBlur={onBlurCell}
          />
        ) : (
          <p
            onDoubleClick={() => {
              onCellEdit({
                productId: id,
                field: 'price',
                initialContent: price,
              })
            }}
          >
            {price}
          </p>
        )}
      </td>
    </tr>
  )
}
