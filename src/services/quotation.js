import { createClient } from '@supabase/supabase-js'
import { PUBLIC_KEY } from '../const/index.js'
const TABLE_NAME = 'quotations'

const supabaseUrl = 'https://dnvhsncsgfkaqhspppqv.supabase.co'
const supabaseKey = PUBLIC_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function getQuotations() {
  try {
    const { data: quotationsData, error: quotationsError } = await supabase
      .from('quotations')
      .select('*');

    if (quotationsError) {
      console.error('Error al obtener las cotizaciones:', quotationsError);
      return null;
    }

    if (!quotationsData || quotationsData.length === 0) {
      console.log('No hay cotizaciones registradas');
      return [];
    }

    const quotationIds = quotationsData.map(quo => quo.id);
    const { data: itemsData, error: itemsError } = await supabase
      .from('items')
      .select('*')
      .in('quotationId', quotationIds);

    if (itemsError) {
      console.error('Error al obtener los items:', itemsError);
      return null;
    }

    const quotationsWithItems = quotationsData.map(quotation => {
      const items = itemsData.filter(item => item.quotationId === quotation.id);
      return { ...quotation, items };
    });

    return quotationsWithItems;
  } catch (error) {
    console.error('Error al obtener las cotizaciones:', error);
    return null;
  }
}


// export async function getQuotations() {
//   const { data, error } = await supabase
//     .from(TABLE_NAME)
//     .select('*')

//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Producto insertado con éxito:', data);
//   }

//   return data
// }

export async function getItem(id) {
  const { data: items, error } = await supabase
    .from('items')
    .select(id)

}

export async function addQuotation(quotationData) {
  console.log('addQuoDb', quotationData)
  const { data, error } = await supabase
    .from('quotations')
    .insert({
      quoNumber: quotationData.quoNumber,
      company: quotationData.company,
      phone: quotationData.phone,
      address: quotationData.address,
      date: quotationData.date,
      ruc: quotationData.ruc,
      deadline: quotationData.deadline,
    })
    .select()

  if (error) {
    console.log('Error Quotation', error)
  } else {
    console.log('Succes Quotation')
    const quotationId = data[0].id
    addItem(quotationData.items, quotationId)
  }

}

export async function addItem(items, quotationId) {
  const itemsToInsert = items.map(item => ({
    quotationId,
    qty: item.qty,
    rate: item.rate,
    size: item.size,
    desc: item.desc
  }))
  const { data, error } = await supabase
    .from('items')
    .insert(itemsToInsert)
    .select()
  if (error) {
    console.log('Error Item', error)
  } else {
    console.log('Success', data)
  }
}



// export async function deleteQuotation(table, id) {
//   const { error } = await supabase
//     .from(table)
//     .delete()
//     .eq('id', id)
// }

export async function deleteQuotation(quotationId) {
  try {
    // Eliminar los items asociados a la cotización
    const { error: itemsError } = await supabase
      .from('items')
      .delete()
      .eq('quotationId', quotationId);

    if (itemsError) {
      console.error('Error al eliminar los items asociados a la cotización:', itemsError);
    }

    // Eliminar la cotización
    const { error: quotationError } = await supabase
      .from('quotations')
      .delete()
      .eq('quotationId', quotationId);

    if (quotationError) {
      console.error('Error al eliminar la cotización:', quotationError);
    } else {
      console.log('Cotización eliminada exitosamente.');
    }
  } catch (error) {
    console.error('Error al eliminar la cotización:', error);
  }
}

export async function updateQuotation(quotationData) {
  console.log('updateQuoDb', quotationData)
  try {
    const { error: quotationError } = await supabase
      .from('quotations')
      .update({
        quoNumber: quotationData.quoNumber,
        company: quotationData.company,
        phone: quotationData.phone,
        address: quotationData.address,
        date: quotationData.date,
        ruc: quotationData.ruc,
        deadline: quotationData.deadline,
      })
      .eq('id', quotationData.id);

    if (quotationError) {
      console.error('Error al actualizar la cotización:', quotationError);
      return;
    }

    // Eliminar los items actuales asociados a la cotización
    const { error: deleteItemsError } = await supabase
      .from('items')
      .delete()
      .eq('quotationId', quotationData.id);

    if (deleteItemsError) {
      console.error('Error al eliminar los items asociados a la cotización:', deleteItemsError);
      return;
    }

    // Insertar los nuevos items asociados a la cotización
    const itemsToInsert = quotationData.items.map(item => ({ 
       quotationId: quotationData.id,
      qty: item.qty,
      rate: item.rate,
      size: item.size,
      desc: item.desc
    }));
    const { error: insertItemsError } = await supabase
      .from('items')
      .insert(itemsToInsert);

    if (insertItemsError) {
      console.error('Error al insertar los nuevos items asociados a la cotización:', insertItemsError);
      return;
    }

    console.log('Cotización actualizada exitosamente.');
  } catch (error) {
    console.error('Error al actualizar la cotización:', error);
  }
}

