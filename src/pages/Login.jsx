import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import '../styles/forms.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } })

  const onSubmit = (data) => {
    console.log('Datos de login:', data)
    Swal.fire({
      icon: 'info',
      title: 'Datos recibidos',
      text: 'Por ahora el login no autentica. Mirá la consola del navegador.',
      confirmButtonColor: '#DD2D4A',
    })
  }

  return (
    <main className="page form-page">
      <h1>Iniciar sesión</h1>
      <div className="form-card">
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className={errors.password ? 'input-error' : ''}
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
              maxLength: { value: 20, message: 'La contraseña no puede superar los 20 caracteres' },
            })}
          />
          {errors.password && <span className="form-error">{errors.password.message}</span>}

          <div className="form-actions">
            <button type="submit" className="btn-primary btn-lg">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login
