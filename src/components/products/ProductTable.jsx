import { formatDate } from '../../utils/formatDate'

function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="empty-message">Todavía no hay productos cargados.</p>
  }

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Fecha de ingreso</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.name} width="60" />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{formatDate(product.createdAt)}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>
                <div className="table-actions">
                  <button className="btn-edit" onClick={() => onEdit(product)}>
                    Editar
                  </button>
                  <button className="btn-delete" onClick={() => onDelete(product)}>
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

export default ProductTable
