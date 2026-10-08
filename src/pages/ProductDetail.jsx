import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getProductById } from '../services/products.service'
import Loader from '../components/ui/Loader'
import '../styles/product-detail.css'

function ProductDetail() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        setProduct(await getProductById(id))
      } catch (err) {
        console.error(err)
        setError('No encontramos este producto.')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    Swal.fire({
      icon: 'info',
      title: 'Próximamente',
      text: 'El carrito de compras se suma en una próxima entrega.',
      confirmButtonColor: '#DD2D4A',
    })
  }

  if (loading) {
    return (
      <main className="page">
        <Loader text="Cargando producto..." />
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="page">
        <p className="error-message">{error ?? 'No encontramos este producto.'}</p>
        <p className="center">
          <Link to="/products" className="btn-primary">
            Volver a productos
          </Link>
        </p>
      </main>
    )
  }

  return (
    <main className="page detail-main">
      <section className="detail-hero">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="detail-info">
          <Link to="/products" className="detail-back">
            ← Volver a productos
          </Link>
          <h1>{product.name}</h1>
          <p className="detail-category">Categoría: {product.category}</p>
          <p className="detail-price">${Number(product.price).toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>

          <button className="btn-primary" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </section>
    </main>
  )
}

export default ProductDetail
