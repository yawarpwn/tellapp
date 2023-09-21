export default function SuggestedProducts ({ results, qtyInputRef,  updateProduct, updateCode }) {
  const handleClick = (product) => {
    if (!product.unit_size || !product.qty || !product.price) {
      updateProduct({
        description: product.description,
        price: product.price,
        unit_size: product.unit_size,
        qty: 1,
      })
    }

    updateCode(product.code)

    updateProduct({
      description: product.description,
    })

    qtyInputRef.current.focus()
  }
  return (
    <ul className="result flex flex-col gap-1">
      {results.map((product) => {
        return (
          <li
            key={product.id}
            className="text-foreground-900 bg-foreground-200 hover:bg-foreground-300 cursor-pointer p-2 rounded-lg text-xs"
            onClick={() => handleClick(product)}
          >
            {product.description}
          </li>
        )
      })}
    </ul>
  )
}
