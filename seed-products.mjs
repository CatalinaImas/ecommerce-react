// Carga los 8 productos de la primera entrega en tu MockAPI.
import { BASE_URL } from './src/services/config.js'

if (BASE_URL.includes('TU-PROYECTO')) {
  console.error('Primero cambiá BASE_URL en src/services/config.js por la URL de tu MockAPI.')
  process.exit(1)
}

const products = [
  { name: 'NYC Classic Choco Chunk', price: 7.5, category: 'Clásicas', image: '/assets/images/products/product-1.png', description: 'Cookie plant-based estilo New York, con trozos grandes de chocolate, centro suave y bordes crocantes.', createdAt: '2026-06-01T12:00:00.000Z' },
  { name: 'Matcha White Bliss', price: 8, category: 'Especiales', image: '/assets/images/products/product-2.png', description: 'Cookie verde de matcha con chocolate blanco vegano.', createdAt: '2026-06-01T12:00:00.000Z' },
  { name: 'Salted Caramel Oat Cookie', price: 7, category: 'Avena', image: '/assets/images/products/product-3.png', description: 'Cookie de avena con caramelo salado.', createdAt: '2026-06-01T12:00:00.000Z' },
  { name: 'Double Dark Brooklyn Bite', price: 8.5, category: 'Intensos', image: '/assets/images/products/product-4.png', description: 'Cookie intensa de cacao y chips de chocolate oscuro.', createdAt: '2026-06-01T12:00:00.000Z' },
  { name: 'Peanut Butter Soho Soft', price: 7.5, category: 'Peanut Butter', image: '/assets/images/products/product-5.png', description: 'Cookie suave de manteca de maní.', createdAt: '2026-06-01T12:00:00.000Z' },
  { name: 'Blueberry Lemon Crumble', price: 8, category: 'Frutales', image: '/assets/images/products/product-6.png', description: 'Cookie frutal con arándanos y limón.', createdAt: '2026-06-01T12:00:00.000Z' },
  { name: 'Almond Espresso Crunch', price: 8.5, category: 'Café', image: '/assets/images/products/product-7.png', description: 'Cookie crocante con almendras y café espresso.', createdAt: '2026-06-01T12:00:00.000Z' },
  { name: 'Vegan S’mores Midtown', price: 9, category: 'Especiales', image: '/assets/images/products/product-8.png', description: 'Cookie especial con malvaviscos veganos y chocolate.', createdAt: '2026-06-01T12:00:00.000Z' },
]

const existing = await (await fetch(`${BASE_URL}/products`)).json()
if (Array.isArray(existing) && existing.length > 0 && !process.argv.includes('--force')) {
  console.error(`Tu MockAPI ya tiene ${existing.length} productos. Borralos desde mockapi.io o corré: node seed-products.mjs --force`)
  process.exit(1)
}

for (const product of products) {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  console.log(res.ok ? `✔ ${product.name}` : `✘ ${product.name} (error ${res.status})`)
}
