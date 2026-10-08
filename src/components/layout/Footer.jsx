import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col">
        <img src="/assets/images/logo.png" alt="Logo" className="footer-logo" />
        <p>Urban Plant Cookies ®</p>
      </div>

      <div className="footer-col">
        <h4>Redes</h4>
        <a
          href="https://www.linkedin.com/in/catalina-imas-378a73318/?skipRedirect=true"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFacebook} /> Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTwitter} /> Twitter
        </a>
      </div>

      <div className="footer-col">
        <h4>Contacto</h4>
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> info@urbanplantcookies.com
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} /> +1 305 555 1234
        </p>
        <p>
          <FontAwesomeIcon icon={faLocationDot} /> New York, USA
        </p>
      </div>
    </footer>
  )
}

export default Footer