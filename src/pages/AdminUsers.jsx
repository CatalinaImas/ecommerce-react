import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { getUsers, createUser, updateUser, deleteUser } from '../services/users.service'
import UserTable from '../components/users/UserTable'
import UserForm from '../components/users/UserForm'
import Loader from '../components/ui/Loader'
import '../styles/forms.css'
import '../styles/admin.css'

const COLOR = '#DD2D4A'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  const loadUsers = async () => {
    try {
      setUsers(await getUsers())
      setError(null)
    } catch (err) {
      console.error(err)
      setError('No pudimos cargar los usuarios.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleSubmit = async (userData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, userData)
        Swal.fire({ icon: 'success', title: 'Usuario actualizado', confirmButtonColor: COLOR })
        setSelectedUser(null)
      } else {
        await createUser(userData)
        Swal.fire({ icon: 'success', title: 'Usuario creado', confirmButtonColor: COLOR })
      }
      await loadUsers()
      return true
    } catch (err) {
      console.error(err)
      Swal.fire({
        icon: 'error',
        title: 'No se pudo guardar el usuario',
        text: 'Revisá tu conexión e intentá de nuevo.',
        confirmButtonColor: COLOR,
      })
      return false
    }
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    document.getElementById('user-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDelete = async (user) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: `¿Borrar a "${user.name}"?`,
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: COLOR,
    })

    if (!result.isConfirmed) return

    try {
      await deleteUser(user.id)
      if (selectedUser?.id === user.id) setSelectedUser(null)
      Swal.fire({ icon: 'success', title: 'Usuario eliminado', confirmButtonColor: COLOR })
      await loadUsers()
    } catch (err) {
      console.error(err)
      Swal.fire({ icon: 'error', title: 'No se pudo borrar el usuario', confirmButtonColor: COLOR })
    }
  }

  return (
    <main className="page">
      <div className="admin-panel">
        <h1>Administración de usuarios</h1>

        <section className="admin-section">
          <h2>Usuarios registrados</h2>
          {loading && <Loader text="Cargando usuarios..." />}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && (
            <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </section>

        <section className="admin-section form-card" id="user-form">
          <h2>{selectedUser ? 'Editar usuario' : 'Crear usuario'}</h2>
          <UserForm
            defaultValues={selectedUser}
            onSubmit={handleSubmit}
            onCancel={() => setSelectedUser(null)}
            submitText={selectedUser ? 'Guardar cambios' : 'Crear usuario'}
          />
        </section>
      </div>
    </main>
  )
}

export default AdminUsers
