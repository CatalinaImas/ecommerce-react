import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import './ProductCard.css'

// Recibe un producto por "props" y lo dibuja como tarjeta.
function ProductCard({ product }) {
  const { id, name, category, price, image } = product

  const handleBuy = () => {
    Swal.fire({
      icon: 'info',
      title: 'Próximamente',
      text: 'El carrito de compras se suma en una próxima entrega.',
      confirmButtonColor: '#DD2D4A',
    })
  }

  return (
    <article className="product-card">
      <img src={image} alt={name} loading="lazy" />
      <h3>{name}</h3>
      <p className="product-card__category">{category}</p>
      <p className="product-card__price">${Number(price).toFixed(2)}</p>

      <div className="product-card__buttons">
        <button className="btn-primary" onClick={handleBuy}>
          Comprar
        </button>
        <Link to={`/products/${id}`} className="btn-secondary">
          Ver más
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
