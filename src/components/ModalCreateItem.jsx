import { useState } from "react"

export default function ModalCreateItem({ onClose, addProduct, onSaveEdit, editingItem }) {
  const [product, setProduct] = useState(editingItem?.desc ?? '')
  const [qty, setQty] = useState(editingItem?.qty ?? '')
  const [size, setSize] = useState(editingItem?.size ?? '')
  const [price, setPrice] = useState(editingItem?.rate ?? '')

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const item = {
      desc: product,
      qty,
      size,
      rate: price
    }

    if (editingItem) {
      onSaveEdit(item)
    } else {

      addProduct(item)
    }

    onClose()
  }

  return (

    <div className="fixed h-screen top-0 left-0 right-0 z-50 bg-black/80 flex items-center justify-center" onClick={event => {
      if (event.target !== event.currentTarget) {
        return
      }
      onClose()
    }}>
      <div className="bg-white max-w-sm rounded-lg shadow-lg ">
        <form className="p-8" onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <label className="quotation-label">
              producto
            </label>
            <input
              name='product'
              value={product}
              onChange={ev => setProduct(ev.target.value)}
              className="quotation-input"
              placeholder="Senal fotoluminiscente con base celtex 3mm" />
          </div>
          <div className="relative mb-4">
            <label className="quotation-label">
              U/M
            </label>
            <input
              name='size'
              className="quotation-input"
              placeholder="60x60cm"
              value={size}
              onChange={ev => setSize(ev.target.value)}
            />
          </div>
          <div className="flex items-center  mb-4">
            <div className="relative w-1/2">
              <label className="quotation-label">
                Precio
              </label>
              <input
                value={price}
                onChange={ev => setPrice(Number(ev.target.value))}
                name='price'
                className="quotation-input w-20"
                placeholder="100.00" />
            </div>

            <div className="relative">
              <label name='qty' className="quotation-label">
                Cantidad
              </label>
              <input
                className="quotation-input w-20"
                placeholder="10"
                value={qty}
                onChange={ev => setQty(Number(ev.target.value))}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button className="border border-black px-4 py-2 rounded-lg" type="submit">+Agregar</button>
            <button className="border border-black px-4 py-2 rounded-lg" type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>

  )
}
