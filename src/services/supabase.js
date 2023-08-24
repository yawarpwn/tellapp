// import { SUPABASE_URL, SUPABASE_PUBLIC_KEY } from "@/constants";
import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL = 'https://dnvhsncsgfkaqhspppqv.supabase.co'
const SUPABASE_PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRudmhzbmNzZ2ZrYXFoc3BwcHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5MTg0ODksImV4cCI6MjAwNjQ5NDQ4OX0.fZBY9uT0N4sKiG9qplto1KdJarxDsQy4hgMFHv9WHMk'

const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY)


export async function getQuotations() {
  const { data, error } = await client
    .from('cotizaciones')
    .select('*')
    .order('quo_number', { ascending: false })
  if (error) {
    throw error
  }
  return data
}

export async function getQuotation({ quo_number }) {
  const { data, error } = await client
    .from('cotizaciones')
    .select('*')
    .eq('quo_number', quo_number)
  if (error) {
    throw error
  }
  return data[0]
}

export async function insertQuotation({ quoToInsert }) {
  const { data, error } = await client
    .from('cotizaciones')
    .insert(quoToInsert)
    .select()
  if (error) {
    throw error
  }
  return data[0]
}

export async function updateQuotation({ quoToUpdate, id }) {
  const { data, error } = await client
    .from('cotizaciones')
    .update(quoToUpdate)
    .eq('id', id)
    .select()

  if (error) {
    throw error
  }

  return data[0]
}

// Productos

export async function getProducts() {
  const { data, error } = await client.from('products')
    .select('*')
  .order('description')
  if (error) {
    throw error
  }
  return data
}

export async function updateProduct({  productToUpdate, id }) {
  const { data, error } = await client
    .from('products')
    .update(productToUpdate)
    .eq('id', id)
    .select()

  if (error) {
    throw error
  }

  return data[0]
}

export async function insertProduct({ productToInsert }) {
  const { data, error } = await client
    .from('products')
    .insert(productToInsert)
    .select()
  if (error) {
    throw error
  }
  return data[0]
}

export const deleteProduct = async ({ id }) => {
  const { data, error } = await client
    .from('products')
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    throw error
  }
  return data[0]
}

// Cotizaciones

export const deleteQuotation = async ({ id }) => {
  const { data, error } = await client
    .from('cotizaciones')
    .delete()
    .eq('id', id)
    .select()

  if (error) {
    throw error
  }
  return data[0]
}

export { client }
