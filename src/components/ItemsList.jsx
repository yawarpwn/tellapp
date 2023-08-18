import EditIcon from "../icons/EditIcon"
import DeleteIcon from "../icons/DeleteIcon"
import { getIgv } from "../utils/numbers"
export default function ItemsList({ items, onRemove, onOpen }) {
  const { total } = getIgv(items)
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full h-auto text-sm text-left text-zinc-500 ">
          <thead className="text-xs text-zinc-700 uppercase ">
            <tr>
              <th scope="col" className="table-th">
                Producto
              </th>
              <th scope="col" className="table-th">
                U/M
              </th>
              <th scope="col" className="table-th">
                P.Unit
              </th>
              <th scope="col" className="table-th">
                Cant
              </th>
              <th scope="col" className="table-th">
                Monto
              </th>
              <th scope="col" className="table-th">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={item.id} className={`${index % 2 ? 'bg-zinc-800' : ''}`}>
                  <td scope="row" className="table-td">
                    <p className="max-w-[300px] truncate">
                      {item.description}
                    </p>
                  </td>
                  <td className="table-td">
                    {item.unit_size}
                  </td>
                  <td className="table-td">
                    {(item.price).toFixed(2)}
                  </td>
                  <td className="table-td">
                    {item.qty}
                  </td>
                  <td className="table-td">
                    {(item.qty * item.price).toFixed(2)}
                  </td>
                  <td>
                    <div className="flex gap-x-2 items-center">
                      <button type="button" aria-label="edit button" onClick={() => onOpen(item)}>
                        <EditIcon />
                      </button>
                      <button type='button' aria-label="close modal button" onClick={() => onRemove(item.id)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="px-4 py-2 bg-black text-white ">
                Total
              </td>
              <td className="px-4 py-2 bg-black text-white">{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>

  )
}

