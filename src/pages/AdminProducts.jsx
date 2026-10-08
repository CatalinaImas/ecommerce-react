import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products.service'
import ProductTable from '../components/products/ProductTable'
import ProductForm from '../components/products/ProductForm'
import Loader from '../components/ui/Loader'
import '../styles/forms.css'
import '../styles/admin.css'

const COLOR = '#DD2D4A'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedProduct, setSelectedProduct] = useState(null)

  const loadProducts = async () => {
    try {
      setProducts(await getProducts())
      setError(null)
    } catch (err) {
      console.error(err)
      setError('No pudimos cargar los productos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Se ejecuta al enviar el formulario. Devuelve true si todo salio bien
  const handleSubmit = async (formData) => {
    const data = { ...formData, price: Number(formData.price) }

    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, data)
        Swal.fire({ icon: 'success', title: 'Producto actualizado', confirmButtonColor: COLOR })
        setSelectedProduct(null)
      } else {
        await createProduct({ ...data, createdAt: new Date().toISOString() })
        Swal.fire({ icon: 'success', title: 'Producto creado', confirmButtonColor: COLOR })
      }
      await loadProducts()
      return true
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar el producto',
        text: 'Revisá tu conexión e intentá de nuevo.',
        confirmButtonColor: COLOR,
      })
      return false
    }
  }

  const handleEdit = (product) => {
    setSelectedProduct(product)
    document.getElementById('product-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: `¿Borrar "${product.name}"?`,
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: COLOR,
    })

    if (!result.isConfirmed) return

    try {
      await deleteProduct(product.id)
      if (selectedProduct?.id === product.id) setSelectedProduct(null)
      Swal.fire({ icon: 'success', title: 'Producto eliminado', confirmButtonColor: COLOR })
      await loadProducts()
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'No se pudo borrar el producto',
        confirmButtonColor: COLOR,
      })
    }
  }

  return (
    <main className="page">
      <div className="admin-panel">
        <h1>Administración de productos</h1>

        <section className="admin-section">
          <h2>Listado de productos</h2>
          {loading && <Loader text="Cargando productos..." />}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && (
            <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </section>

        <section className="admin-section form-card" id="product-form">
          <h2>{selectedProduct ? 'Editar producto' : 'Agregar nuevo producto'}</h2>
          <ProductForm
            selectedProduct={selectedProduct}
            onSubmit={handleSubmit}
            onCancel={() => setSelectedProduct(null)}
          />
        </section>
      </div>
    </main>
  )
}

export default AdminProducts
