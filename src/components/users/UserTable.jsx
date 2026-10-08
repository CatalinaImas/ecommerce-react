function UserTable({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return <p className="empty-message">Todavía no hay usuarios registrados.</p>
  }

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Fecha de nacimiento</th>
            <th>Provincia / País</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.birthDate}</td>
              <td>{user.province}</td>
              <td>
                <div className="table-actions">
                  <button className="btn-edit" onClick={() => onEdit(user)}>
                    Editar
                  </button>
                  <button className="btn-delete" onClick={() => onDelete(user)}>
                    Borrar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
