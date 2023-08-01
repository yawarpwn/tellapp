import { getIgv } from "../utils/numbers"
export default function Quotation({ quotation }) {
  const { total, subTotal, igv } = getIgv(quotation.items)
  return (

    <div>
      {/* INfo */}
      <div className='flex justify-between'>
        <div>
          <p>
            <span> CLIENTE:</span>
            <span>{quotation.company}</span>
          </p>
          <p>
            <span> RUC:</span>
            <span>{quotation.ruc}</span>
          </p>
          <p>
            <span> Tel:</span>
            <span>{quotation.address}</span>
          </p>
          <p>
            <span> Tel:</span>
            <span>{quotation.phone}</span>
          </p>
        </div>

        <div>
          <p>
            <span> COTIZACION:</span>
            <span>{quotation.quoNumber}</span>
          </p>
          <p>
            <span> FECHA:</span>
            <span>{new Intl.DateTimeFormat('en-US').format(new Date(quotation.date))}</span>
          </p>
        </div>
      </div>
      {/* TAbla */}
      <table className="w-full">
        <thead className='border-b-black border-b-2 border-t-black border-t-2'>
          <tr>
            <th>
              No
            </th>
            <th>
              Descripcion
            </th>

            <th>
              U/M
            </th>

            <th>
              CANT.
            </th>

            <th>
              P. UNIT
            </th>
            <th>
              MONTO
            </th>
          </tr>
        </thead>
        <tbody className='border-b-black border-b-2'>
          {quotation.items.map(({ id, desc, qty, rate, size }, index) => {
            return (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>{desc}</td>
                <td>{size}</td>
                <td>{qty}</td>
                <td>{(rate / 1.18).toFixed(2)}</td>
                <td>{(rate * qty).toFixed(2)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Total */}
      <div className='flex justify-end'>
        <div className='flex flex-col gap-y-4'>
          <div className='grid grid-cols-2 items-center gap-x-8'>
            <p>Descuentos</p>
            <div>
              <span>S/</span>
              <span>0.00</span>
            </div>
          </div>

          <div className='grid grid-cols-2 items-center gap-x-8'>
            <p>Total Ventas Gravadas</p>
            <div>
              <span>S/</span>
              <span>{subTotal}</span>
            </div>
          </div>

          <div className='grid grid-cols-2 items-center gap-x-8'>
            <p>total IGV (18%)</p>
            <div>
              <span>S/</span>
              <span>{igv}</span>
            </div>
          </div>

          <div className='grid grid-cols-2 items-center gap-x-8 bg-black text-white'>
            <p>Total</p>
            <div className='flex gap-x-2'>
              <span>S/</span>
              <span className='text-right'>{total}</span>
            </div>
          </div>
        </div>
      </div>
      {/* TErminos y Condiciones */}
      <div>
        <h2>TÉRMINOS Y CONDICIONES</h2>
        <p>
          <span>TIEMPO DE ENTREGA:</span>
          <span>5 día(s) útil, una vez recepcionada la Orden de Compra y/o aprobación de artes</span>
        </p>

        <p>
          <span>FORMA DE PAGO:</span>
          <span>50% adelanto , 50% contraentrega</span>
        </p>

        <p>
          <span>VALIDEZ:</span>
          <span>15 días </span>
        </p>
      </div>
    </div>
  )
}
