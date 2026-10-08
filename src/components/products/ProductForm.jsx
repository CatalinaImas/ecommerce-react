import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { CATEGORIES } from '../../constants/categories'

const EMPTY = {
  name: '',
  price: '',
  description: '',
  image: '',
  category: '',
}

// Un mismo formulario para crear y para editar:
function ProductForm({ selectedProduct, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY })

  const isEdit = Boolean(selectedProduct)

  // Cada vez que cambia el producto seleccionado, rellenamos (o vaciamos) el form
  useEffect(() => {
    reset(selectedProduct ?? EMPTY)
  }, [selectedProduct, reset])

  const submit = async (data) => {
    const ok = await onSubmit(data)
    if (ok && !isEdit) reset(EMPTY)
  }

  return (
    <form className="form" onSubmit={handleSubmit(submit)} noValidate>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            className={errors.name ? 'input-error' : ''}
            {...register('name', {
              required: 'El nombre es obligatorio',
              minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' },
              maxLength: { value: 60, message: 'El nombre no puede superar los 60 caracteres' },
            })}
          />
          {errors.name && <span className="form-error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            id="price"
            type="number"
            step="0.01"
            className={errors.price ? 'input-error' : ''}
            {...register('price', {
              required: 'El precio es obligatorio',
              min: { value: 0.01, message: 'El precio debe ser mayor a 0' },
              max: { value: 10000, message: 'El precio no puede superar los $10.000' },
            })}
          />
          {errors.price && <span className="form-error">{errors.price.message}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            rows="3"
            className={errors.description ? 'input-error' : ''}
            {...register('description', {
              required: 'La descripción es obligatoria',
              minLength: { value: 10, message: 'La descripción debe tener al menos 10 caracteres' },
              maxLength: { value: 300, message: 'La descripción no puede superar los 300 caracteres' },
            })}
          />
          {errors.description && (
            <span className="form-error">{errors.description.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            className={errors.category ? 'input-error' : ''}
            {...register('category', { required: 'Elegí una categoría' })}
          >
            <option value="">Seleccionar...</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <span className="form-error">{errors.category.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Imagen (URL)</label>
          <input
            id="image"
            type="text"
            placeholder="https://... o /assets/images/products/product-1.png"
            className={errors.image ? 'input-error' : ''}
            {...register('image', {
              required: 'La imagen es obligatoria',
              pattern: {
                value: /^(https?:\/\/|\/).+/,
                message: 'Ingresá una URL (https://...) o una ruta que empiece con /',
              },
            })}
          />
          {errors.image && <span className="form-error">{errors.image.message}</span>}
        </div>
      </div>

      <div className="form-actions">
        {isEdit && (
          <button type="button" className="btn-secondary-outline" onClick={onCancel}>
            Cancelar edición
          </button>
        )}
        <button type="submit" className="btn-primary btn-lg" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
