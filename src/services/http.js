import { BASE_URL } from './config'

// si la API responde con un código que no es 2xx (404, 500, etc.)
export async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    throw new Error(`Error ${res.status} al pedir ${path}`)
  }

  return res.json()
}
