import { useState } from 'react'
import Button from '../atoms/Button'
import { XIcon } from '../icons'
import Input from '../atoms/Input'
import { CATEGORIES } from '../constants'
export default function CreateUpdateProduct({
  editingProduct,
  onCloseModal,
  onSaveProduct,
  onUpdateProduct,
}) {
  const initialProduct = editingProduct || {
    description: '',
    unit_size: '',
    price: '',
    code: '',
    category: CATEGORIES.SEGURIDAD.title,
    cost: 0,
  }

  const [product, setProduct] = useState(initialProduct)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (editingProduct) {
      onUpdateProduct(product)
    } else {
      onSaveProduct(product)
    }
    onCloseModal()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4">
        <Input
          required
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, description: e.target.value }))
          }
          value={product.description}
          label="Descripcion"
          type="text"
          placeholder="Descripcion de producto"
          autoFocus
        />
        <Input
          required
          onChange={(e) =>
            setProduct((prev) => ({ ...prev, code: e.target.value }))
          }
          value={product.code}
          label="Codigo"
          type="text"
          placeholder="Descripcion de producto"
        />
        <div className="flex gap-4">
          <Input
            required
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
            value={product.price}
            label="Precio"
            type="number"
            step="0.5"
            placeholder="100"
          />

          <Input
            required
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, cost: Number(e.target.value) }))
            }
            value={product.cost}
            label="Costo"
            type="number"
            placeholder="10.00"
          />
        </div>
        <div className="flex gap-2 ">
          <Input
            required
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, unit_size: e.target.value }))
            }
            value={product.unit_size}
            label="Unidad / Medida"
            type="text"
            placeholder="30x30cm"
          />
          <select
            value={product.category}
            onChange={(e) =>
              setProduct((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            {Object.values(CATEGORIES).map(({ title }) => (
              <option
                value={title}
                key={title}
              >
                {title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <footer className="flex items-center justify-end">
        <Button>{editingProduct ? 'Actualizar' : 'Guardar'}</Button>
      </footer>
    </form>
  )
}
