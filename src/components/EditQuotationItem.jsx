import { useEffect, useRef, useState } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import { searchProduct } from '../services/search'
import { getProducts } from '../services/supabase'

function ModalCreateItem({ onClose, addProduct, onSaveEdit, editingItem }) {
  const initialProduct = editingItem || {
    description: '',
    qty: '',
    unit_size: '',
    price: '',
  }

  const [product, setProduct] = useState(initialProduct)
  const [results, setResults] = useState([])
  const [code, setCode] = useState('FHIP-P')
  const cacheResult = useRef([])
  const qtyInput = useRef(null)

  const isEmpety = (obj) => {
    const arrValues = Object.values(obj)
    return arrValues.some(value => !value)
  }


  const handleSubmit = (ev) => {
    ev.preventDefault()

    if(isEmpety(product)) {
      return
    }

    if (editingItem) {
      onSaveEdit(product)
    } else {
      addProduct({
        ...product,
        id: crypto.randomUUID(),
      })
    }

    onClose()
  }

  useEffect(() => {
    if (cacheResult.current.length === 0) {
      getProducts()
        .then((data) => {
        cacheResult.current = data
        const resultProducts = searchProduct(product.description, data)
        setResults(resultProducts)
      })
    } else {
      const resultProducts = searchProduct(
        product.description,
        cacheResult.current
      )
      setResults(resultProducts)
    }
  }, [product.description])

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Input
        autoFocus
        label="Producto"
        name="description"
        type="search"
        value={product.description}
        onChange={(event) =>
          setProduct((prev) => ({
            ...prev,
            description: event.target.value,
          }))
        }
        placeholder="Senal fotoluminiscente con base celtex 3mm"
      />
      <div className="col-span-2">
        <h2 className="font-bold text-lg">Sugerencias:</h2>
      </div>
      <div className="col-span-2 h-40 overflow-y-auto">
        <ul className="result flex flex-col gap-1">
          {results.map(({ description, id, unit_size, price, code }) => {
            return (
              <li
                key={id}
                className="text-foreground-900 bg-foreground-200 hover:bg-foreground-300 cursor-pointer p-2 rounded-lg text-xs"
                onClick={() => {
                  if (!product.unit_size || !product.qty || !product.price) {
                    setProduct((prevProduct) => ({
                      ...prevProduct,
                      description: description,
                      price: price,
                      unit_size: unit_size,
                      qty: 1,
                    }))
                  }

                  setCode(code)

                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    description: description,
                  }))

                  qtyInput.current.focus()
                }}
              >
                {description}
              </li>
            )
          })}
        </ul>
      </div>
      <div className='flex gap-x-4'>
        <Input
          label="Medida"
          name="unit_size"
          type="text"
          placeholder="60x60cm"
          value={product.unit_size}
          onChange={(event) =>
            setProduct((prev) => ({ ...prev, unit_size: event.target.value }))
          }
        />

        <Input
          label="Codigo"
          name="code"
          type="text"
          placeholder="FHIP-P"
          value={code}
          onChange={(event) =>
            setProduct(() => setCode(event.target.value))
          }
        />
      </div>
      <div className="flex gap-x-4">
        <Input
          label="Cantidad"
          inputRef={qtyInput}
          type="number"
          placeholder="10"
          value={product.qty}
          onChange={(event) =>
            setProduct((prev) => ({
              ...prev,
              qty: Number(event.target.value),
            }))
          }
          name="qty"
        />

        <Input
          label={'Precio'}
          value={product.price}
          onChange={(event) =>
            setProduct((prev) => ({
              ...prev,
              price: Number(event.target.value),
            }))
          }
          name="price"
          type="number"
          placeholder="100.00"
        />
      </div>

      <footer className="flex justify-end items-center py-2">
        <Button type="submit">{editingItem ? 'Actualizar' : '+Agregar'}</Button>
      </footer>
    </form>
  )
}

export default ModalCreateItem
