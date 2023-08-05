import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://dnvhsncsgfkaqhspppqv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudmhzbmNzZ2ZrYXFoc3BwcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5MTg0ODksImV4cCI6MjAwNjQ5NDQ4OX0.fZBY9uT0N4sKiG9qplto1KdJarxDsQy4hgMFHv9WHMk",
);

export async function deleteRow({ table, id }) {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", id);
    if (!error) {
      console.log("[SUCCESS]: ", ` Row  with id: ${id} deleted `);
    }
  } catch (err) {
    console.log("[ERROR]: ", err.message);
  }
}

async function insertRows({ rows, table }) {
  const { data, error } = await supabase
    .from(table)
    .insert(rows)
    .select();

  if (data) {
    return data;
  } else {
    throw new Error(error.message);
  }
}

export async function updateRow({ rowToUpdate, table, id }) {
  const { data, error } = await supabase
    .from(table)
    .update(rowToUpdate)
    .eq("id", id)
    .select();
  if (data) {
    console.log('actualizado')
    return data;
  } else {
    throw new Error('error al actualizar', error.message);
  }
}

export async function getTableContent(table) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select("*");
    if (error) {
      throw new Error("[SupabaseError:] " + error.message);
    }
    return data;
  } catch (err) {
    console.error(err);
  }
}

export const deleteQuotation = (id) => deleteRow({ id, table: "cotizaciones" });
export const updateQuotation = (quoToUpdate, id) => {
  const {
    quoNumber,
    address,
    company,
    date,
    deadline,
    email,
    phone,
    items
  } = quoToUpdate

  const quoMappedToInsert = {
    quo_number: quoNumber,
    address,
    company,
    date,
    deadline,
    email,
    phone,
    quotation_items: items.map(item => ({
      description: item.desc,
      id: item.id,
      price: item.rate,
      qty: item.qty,
      unit_size: item.size
    }))
  }

  updateRow({ id, table: "cotizaciones", rowToUpdate: quoMappedToInsert })
  .then(r => console.log('actualizado', r))
  .catch(err => console.log('err', err))
}
export const createQuotation = (quoToCreate) => {
    const {
    quoNumber,
    address,
    company,
    date,
    deadline,
    email,
    phone,
    items
  } = quoToCreate 

  const quoMapped = {
    quo_number: quoNumber,
    address,
    company,
    date,
    deadline,
    email,
    phone,
    quotation_items: items.map(item => ({
      description: item.desc,
      id: item.id,
      price: item.rate,
      qty: item.qty,
      unit_size: item.size
    }))
  }
  insertRows({ rows: quoMapped, table: "cotizaciones" });
}
export const client = supabase;
export const getQuotations = () =>  getTableContent("cotizaciones")

export const getCotizaciones = () => getTableContent("cotizaciones");

