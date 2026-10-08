import '../styles/about.css'

function About() {
  return (
    <main className="page about-container">
      <header className="about-header">
        <h1>Acerca de Urban Plant Cookies</h1>
        <p className="subtitle">
          Cookies plant‑based con textura intensa y estética New York style.
        </p>
      </header>

      <section className="about-grid">
        <div className="about-item">
          <h2>El proyecto</h2>
          <p>
            Urban Plant Cookies nace para ofrecer cookies veganas con un estilo único:
            textura intensa, estética cuidada y una identidad inspirada en la repostería
            artesanal más icónica.
          </p>
        </div>

        <div className="about-item">
          <h2>Sobre nosotros</h2>
          <p>
            Nacimos de la pasión por reinterpretar el clásico estilo de cookie gruesa y
            artesanal en una versión plant‑based moderna. Cada cookie refleja nuestra
            esencia: sabor auténtico, ingredientes reales y una estética New York style.
          </p>
        </div>
      </section>

      <section className="about-highlight">
        <h2>Nuestra esencia</h2>
        <p className="quote">
          “Combinamos ingredientes plant‑based premium con un enfoque visual moderno y una
          experiencia pensada al detalle.”
        </p>
      </section>

      <section className="about-profile">
        <div className="profile-card">
          <img src="/assets/images/about.png" alt="Foto de Catalina" />
          <div className="profile-info">
            <h3>Catalina Imas</h3>
            <p>Desarrolladora Web</p>
            <a href="mailto:imascatalina@gmail.com">📧 imascatalina@gmail.com</a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About

