import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main className="page center">
      <h1>Página no encontrada</h1>
      <p className="empty-message">La dirección que buscás no existe.</p>
      <Link to="/" className="btn-primary">
        Volver al inicio
      </Link>
    </main>
  )
}

export default NotFound
