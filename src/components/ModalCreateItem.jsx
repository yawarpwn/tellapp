import { useState, useEffect, memo } from "react"
import { searchProduct } from "../services/search"

function ModalCreateItem({ onClose, addProduct, onSaveEdit, editingItem }) {
  const [desc, setDesc] = useState(editingItem?.desc ?? '')
  const [qty, setQty] = useState(editingItem?.qty ?? '')
  const [size, setSize] = useState(editingItem?.size ?? '')
  const [rate, setRate] = useState(editingItem?.rate ?? '')
  const [results, setResults] = useState([])

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const item = {
      desc: desc,
      qty,
      size,
      rate: rate
    }

    if (editingItem) {
      onSaveEdit(item)
    } else {

      addProduct(item)
    }

    onClose()
  }

  useEffect(() => {
    const resultProducts = searchProduct(desc)
    setResults(resultProducts)
  }, [desc])

  const handleChange = (event) => {
    const { value } = event.target
    setDesc(value)
  }


  return (

    <div className="fixed h-screen top-0 left-0 right-0 z-50 bg-black/80 flex items-center justify-center" onClick={event => {
      if (event.target !== event.currentTarget) {
        return
      }
      onClose()
    }}>
      <div className="bg-white w-full max-w-xs rounded-lg shadow-lg ">
        <form className="px-4 py-6 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="relative col-span-2">
            <label className="quotation-label">
              producto
            </label>
            <input
              name='product'
              type="text"
              value={desc}
              onChange={handleChange}
              className="quotation-input"
              placeholder="Senal fotoluminiscente con base celtex 3mm" />
          </div>
          <div className="col-span-2">
            <h2 className="font-bold text-lg">Sugerencias:</h2>
          </div>
          <div className="col-span-2 max-h-80 overflow-y-auto">
            <ul className="result flex flex-col gap-1">
              {results.map(res => {
                return (
                  <li key={res.code}
                    className="text-gray-800 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg text-xs"
                    onClick={() => setDesc(res.name)}
                  >
                    {res.name}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="relative col-span-2">
            <label className="quotation-label">
              U/M
            </label>
            <input
              name='size'
              type="text"
              className="quotation-input"
              placeholder="60x60cm"
              value={size}
              onChange={ev => setSize(ev.target.value)}
            />
          </div>

          <div className="relative">
            <label name='qty' className="quotation-label">
              Cantidad
            </label>
            <input
              className="quotation-input"
              type="number"
              placeholder="10"
              value={qty}
              onChange={ev => setQty(Number(ev.target.value))}
            />
          </div>

          <div className="relative">
            <label className="quotation-label">
              Precio
            </label>
            <input
              value={rate}
              onChange={ev => setRate(Number(ev.target.value))}
              name='price'
              className="quotation-input"
              type="number"
              placeholder="100.00" />
          </div>
          <div className="flex justify-between items-center col-span-2">
            <button 
              className="border border-black hover:bg-black hover:text-white px-4 py-2 rounded-lg" 
              type="submit">{editingItem ? 'Actualizar' : '+Agregar'}
            </button>
            <button 
              className="border border-black  hover:bg-black hover:text-white  px-4 py-2 rounded-lg" 
              type="button" 
              onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default memo(ModalCreateItem)
