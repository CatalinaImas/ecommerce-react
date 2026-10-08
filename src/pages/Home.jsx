import { useEffect, useState } from 'react'
import { getProducts } from '../services/products.service'
import ProductCard from '../components/ui/ProductCard'
import Loader from '../components/ui/Loader'
import '../styles/home.css'

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  //se ejecuta una sola vez, cuando el componente aparece en pantalla
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        console.error(err)
        setError('No pudimos cargar los productos. Intentá de nuevo en unos minutos.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <>
      {/* BANNER */}
      <section className="banner">
        <video autoPlay muted loop playsInline className="banner-video">
          <source src="/assets/videos/cookies.mp4" type="video/mp4" />
        </video>
        <div className="banner-text">
          <h1>Plant‑Based Cookies, NYC Style</h1>
          <p>Cada cookie celebra el placer de lo simple y lo auténtico.</p>
        </div>
      </section>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-left">
            <h2>Más que cookies, una experiencia urbana.</h2>
            <p>
              Horneadas artesanalmente con ingredientes naturales y textura perfecta: suaves
              por dentro, crocantes por fuera. Inspiradas en el espíritu vibrante de Nueva York.
            </p>
          </div>

          <div className="hero-carousel">
            <div className="hero-carousel-track">
              <img src="/assets/images/hero/hero-cookie.jpg" alt="" />
              <img src="/assets/images/hero/hero-cookie-2.jpg" alt="" />
              <img src="/assets/images/hero/hero-cookie-3.jpg" alt="" />
            </div>
          </div>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section className="home-products">
          <h2 className="section-title">Cookies destacadas</h2>

          {loading && <Loader text="Cargando cookies..." />}
          {error && <p className="error-message">{error}</p>}

          {!loading && !error && (
            <div className="cards-grid">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* CARACTERISTICAS DEL SERVICIO */}
        <section className="home-features">
          <div className="feature-item">
            <span>🚚</span>
            <p>Envíos a todo el país</p>
          </div>
          <div className="feature-item">
            <span>🌱</span>
            <p>100% plant‑based</p>
          </div>
          <div className="feature-item">
            <span>⭐</span>
            <p>Recetas estilo NYC</p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
