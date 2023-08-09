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
  console.log({ rows, table })
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
  if (table === 'cotizaciones') {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order('quo_number', { ascending: false })
    if (error) {
      throw new Error("[SupabaseError:] " + error.message);
    }
    return data;
  }

  const { data, error } = await supabase
    .from(table)
    .select("*")
  if (error) {
    throw new Error("[SupabaseError:] " + error.message);
  }
  return data;
}

export const deleteQuotation = (id) => deleteRow({ id, table: "cotizaciones" });
export const updateQuotation = (quoToUpdate, id) => updateRow({ id, table: "cotizaciones", rowToUpdate: quoToUpdate })
export const createQuotation = (quoToCreate) => insertRows({ rows: quoToCreate, table: "cotizaciones" });
export const getQuotations = () => getTableContent("cotizaciones")
export const getProducts = () => {
  console.log('fetch')
  return getTableContent("products")
}
export const client = supabase;

// const row ={
//     "company": "probando",
//     "address": "",
//     "quo_number": 5000,
//     "date": "2023-08-09",
//     "ruc": "",
//     "phone": "",
//     "deadline": 1,
//     "quotations_items": []
// }

// insertRows({rows: row, table: 'cotizaciones'})
// console.log(await getTableContent('products'))

