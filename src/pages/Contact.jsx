import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import '../styles/forms.css'
import '../styles/contact.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { name: '', email: '', message: '' } })

  const onSubmit = (data) => {
    console.log('Mensaje de contacto:', data)
    Swal.fire({
      icon: 'success',
      title: '¡Mensaje enviado!',
      text: 'Gracias por escribirnos. Te respondemos pronto.',
      confirmButtonColor: '#DD2D4A',
    })
    reset()
  }

  return (
    <main className="page contact-page">
      <h1>Contacto</h1>

      <section className="form-card">
        <h2>Envíanos un mensaje</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            type="text"
            className={errors.name ? 'input-error' : ''}
            {...register('name', {
              required: 'El nombre es obligatorio',
              minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
              maxLength: { value: 50, message: 'El nombre no puede superar los 50 caracteres' },
            })}
          />
          {errors.name && <span className="form-error">{errors.name.message}</span>}

          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            className={errors.email ? 'input-error' : ''}
            {...register('email', {
              required: 'El email es obligatorio',
              maxLength: { value: 60, message: 'El email no puede superar los 60 caracteres' },
              pattern: { value: EMAIL_REGEX, message: 'Ingresá un email válido' },
            })}
          />
          {errors.email && <span className="form-error">{errors.email.message}</span>}

          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            rows="5"
            className={errors.message ? 'input-error' : ''}
            {...register('message', {
              required: 'El mensaje es obligatorio',
              minLength: { value: 20, message: 'El mensaje debe tener al menos 20 caracteres' },
              maxLength: { value: 1000, message: 'El mensaje no puede superar los 1000 caracteres' },
            })}
          />
          {errors.message && <span className="form-error">{errors.message.message}</span>}

          <div className="form-actions">
            <button type="submit" className="btn-primary btn-lg">
              Enviar
            </button>
          </div>
        </form>
      </section>

      <section className="contact-map">
        <h2>Nuestra ubicación</h2>
        <div className="map-container">
          <iframe
            title="Mapa de ubicación"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.903728379575!2d-73.98513068459303!3d40.75889697932639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855d3f8b7f7%3A0xbbb6d6f74a09a1e!2sTimes%20Square!5e0!3m2!1ses!2sus!4v1700000000000"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  )
}

export default Contact
