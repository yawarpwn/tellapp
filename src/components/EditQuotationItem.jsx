import { useState, useEffect, memo, useRef } from "react"
import { searchProduct } from "../services/search"
import { getProducts } from "../services/supabase"
import Input from "../atoms/Input"
import Button from "../atoms/Button"
import { XIcon } from "../icons"

function ModalCreateItem({ onClose, addProduct, onSaveEdit, editingItem }) {
  const [desc, setDesc] = useState(editingItem?.description ?? '')
  const [qty, setQty] = useState(editingItem?.qty ?? 0)
  const [size, setSize] = useState(editingItem?.unit_size ?? '')
  const [rate, setRate] = useState(editingItem?.price ?? 0)
  const [results, setResults] = useState([])
  const cacheResult = useRef([])
  const qtyInput = useRef(null)
  const descriptionInput = useRef(null)

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const item = {
      description: desc,
      qty,
      unit_size: size,
      price: rate
    }

    if (editingItem) {
      onSaveEdit(item)
    } else {

      addProduct(item)
    }

    onClose()
  }

  useEffect(() => {
    descriptionInput.current.focus()

    if (cacheResult.current.length === 0) {
      getProducts()
        .then(data => {
          cacheResult.current = data
          const resultProducts = searchProduct(desc, data)
          setResults(resultProducts)
        })
    } else {
      const resultProducts = searchProduct(desc, cacheResult.current);
      setResults(resultProducts);
    }
  }, [desc])

  const handleChange = (event) => {
    const { value } = event.target
    setDesc(value)
  }


  return (

    <div className="fixed h-screen top-0 left-0 right-0 z-50 bg-black/80 flex items-center justify-center"
      onMouseDown={event => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}>
      <div className="relative bg-zinc-900 m-1  text-zinc-500 w-full max-w-lg rounded-lg shadow-lg ">
        <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
          <button
            onClick={onClose}
            className="absolute top-1 right-1 hover:bg-black p-2 rounded-full "
            type="button">
            <XIcon />
          </button>
          <header className="text-xl font-medium py-4">
            {editingItem ? 'Actualizar Producto' : 'Agregar Producto'}
          </header>
          <Input
            label='Producto'
            inputRef={descriptionInput}
            name='product'
            type="search"
            value={desc}
            onChange={handleChange}
            placeholder="Senal fotoluminiscente con base celtex 3mm" />
          <div className="col-span-2">
            <h2 className="font-bold text-lg">Sugerencias:</h2>
          </div>
          <div className="col-span-2 h-40 overflow-y-auto">
            <ul className="result flex flex-col gap-1">
              {results.map(({ description, id, unit_size, price }) => {
                return (
                  <li key={id}
                    className="text-zinc-300 bg-zinc-800 hover:bg-zinc-900 cursor-pointer p-2 rounded-lg text-xs"
                    onClick={() => {
                      setDesc(description)
                      setRate(price)
                      setSize(unit_size)
                      setQty(1)
                      qtyInput.current.focus()
                    }}
                  >
                    {description}
                  </li>
                )
              })}
            </ul>
          </div>
          <Input
            label='Medida'
            name='size'
            type="text"
            placeholder="60x60cm"
            value={size}
            onChange={ev => setSize(ev.target.value)}
          />
          <div className="flex gap-x-4">
            <Input
              label='Cantidad'
              inputRef={qtyInput}
              type="number"
              placeholder="10"
              value={qty}
              onChange={ev => setQty(Number(ev.target.value))}
            />

            <Input
              label={'Precio'}
              value={rate}
              onChange={ev => setRate(Number(ev.target.value))}
              name='price'
              type="number"
              placeholder="100.00" />
          </div>

          <footer className="flex justify-end items-center py-2">
            <Button
              type="submit">{editingItem ? 'Actualizar' : '+Agregar'}
            </Button>
          </footer>
        </form>
      </div>
    </div>

  )
}

export default memo(ModalCreateItem)
