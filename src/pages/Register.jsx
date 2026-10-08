import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import UserForm from '../components/users/UserForm'
import { createUser } from '../services/users.service'
import '../styles/forms.css'

function Register() {
  const navigate = useNavigate()

  // Devuelve true si el usuario se creo bien 
  const handleRegister = async (userData) => {
    try {
      await createUser(userData)
      await Swal.fire({
        icon: 'success',
        title: '¡Cuenta creada!',
        text: 'Ya podés iniciar sesión.',
        confirmButtonColor: '#DD2D4A',
      })
      navigate('/login')
      return true
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'No pudimos crear tu cuenta',
        text: 'Hubo un problema al conectar con el servidor. Intentá de nuevo.',
        confirmButtonColor: '#DD2D4A',
      })
      return false
    }
  }

  return (
    <main className="page form-page">
      <h1>Crear cuenta</h1>
      <div className="form-card">
        <UserForm onSubmit={handleRegister} submitText="Registrarme" />
      </div>
    </main>
  )
}

export default Register
