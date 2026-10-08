import { useEffect, useState } from 'react'
import { getProducts } from '../services/products.service'
import { CATEGORIES } from '../constants/categories'
import ProductCard from '../components/ui/ProductCard'
import Loader from '../components/ui/Loader'
import '../styles/products.css'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filtros
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProducts(await getProducts())
      } catch (err) {
        console.error(err)
        setError('No pudimos cargar los productos. Intentá de nuevo en unos minutos.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const toggleCategory = (category) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange('')
  }

  // Se calcula en cada render a partir de los productos y los filtros
  const filteredProducts = products.filter((product) => {
    const price = Number(product.price)

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category)

    const matchesPrice =
      priceRange === '' ||
      (priceRange === 'low' && price < 8) ||
      (priceRange === 'mid' && price >= 8 && price <= 9) ||
      (priceRange === 'high' && price > 9)

    return matchesCategory && matchesPrice
  })

  return (
    <main className="catalog">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h3>Filtros</h3>

        <div className="filter-group">
          <h4>Categorías</h4>
          {CATEGORIES.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
              />{' '}
              {category}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h4>Precio</h4>
          <label>
            <input
              type="radio"
              name="price"
              checked={priceRange === ''}
              onChange={() => setPriceRange('')}
            />{' '}
            Todos
          </label>
          <label>
            <input
              type="radio"
              name="price"
              checked={priceRange === 'low'}
              onChange={() => setPriceRange('low')}
            />{' '}
            Menos de $8
          </label>
          <label>
            <input
              type="radio"
              name="price"
              checked={priceRange === 'mid'}
              onChange={() => setPriceRange('mid')}
            />{' '}
            $8 - $9
          </label>
          <label>
            <input
              type="radio"
              name="price"
              checked={priceRange === 'high'}
              onChange={() => setPriceRange('high')}
            />{' '}
            Más de $9
          </label>
        </div>

        <button className="btn-secondary-outline" onClick={clearFilters}>
          Limpiar filtros
        </button>
      </aside>

      {/* LISTADO */}
      <section className="catalog-content">
        <h1>Nuestras cookies</h1>

        {loading && <Loader text="Cargando productos..." />}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="empty-message">No hay cookies que coincidan con los filtros.</p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="cards-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Products
