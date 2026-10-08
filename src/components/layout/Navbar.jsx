import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/products', label: 'Productos' },
  { to: '/register', label: 'Registro' },
  { to: '/login', label: 'Login' },
  { to: '/contact', label: 'Contacto' },
  { to: '/about', label: 'Acerca de nosotros' },
  { to: '/admin/products', label: 'Admin productos' },
  { to: '/admin/users', label: 'Admin usuarios' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" onClick={() => setOpen(false)}>
          <img src="/assets/images/logo.png" alt="Urban Plant Cookies" className="logo" />
        </Link>

        <nav className={`nav-links ${open ? 'nav-links--open' : ''}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-user">
          <Link to="/login" className="profile-btn">
            <FontAwesomeIcon icon={faUser} />
            <span>Mi cuenta</span>
          </Link>

          <button className="cart-btn" title="Carrito (próximamente)" aria-label="Carrito">
            <FontAwesomeIcon icon={faCartShopping} />
          </button>

          <button
            className="nav-toggle"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar