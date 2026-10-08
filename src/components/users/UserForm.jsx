import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PROVINCES } from '../../constants/provinces'

const EMPTY = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  birthDate: '',
  province: '',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Formulario reutilizable, lo usan la página registro y el admin de usuario 
function UserForm({ defaultValues, onSubmit, onCancel, submitText = 'Registrarme' }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: EMPTY })

  const isEdit = Boolean(defaultValues)
  // Fecha de hoy (se calcula una sola vez) para no permitir fechas futuras
  const [today] = useState(() => new Date().toISOString().split('T')[0])

  useEffect(() => {
    reset(
      defaultValues
        ? { ...EMPTY, ...defaultValues, repeatPassword: defaultValues.password }
        : EMPTY,
    )
  }, [defaultValues, reset])

  const submit = async (data) => {
    const { repeatPassword: _repeatPassword, ...userData } = data
    const ok = await onSubmit(userData)
    if (ok && !isEdit) reset(EMPTY)
  }

  return (
    <form className="form" onSubmit={handleSubmit(submit)} noValidate>
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
          pattern: { value: EMAIL_REGEX, message: 'Ingresá un email válido (ej: nombre@correo.com)' },
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

      <label htmlFor="repeatPassword">Repetir contraseña</label>
      <input
        id="repeatPassword"
        type="password"
        className={errors.repeatPassword ? 'input-error' : ''}
        {...register('repeatPassword', {
          required: 'Repetí la contraseña',
          validate: (value) => value === getValues('password') || 'Las contraseñas no coinciden',
        })}
      />
      {errors.repeatPassword && (
        <span className="form-error">{errors.repeatPassword.message}</span>
      )}

      <label htmlFor="birthDate">Fecha de nacimiento</label>
      <input
        id="birthDate"
        type="date"
        max={today}
        className={errors.birthDate ? 'input-error' : ''}
        {...register('birthDate', {
          required: 'La fecha de nacimiento es obligatoria',
          validate: (value) => value <= today || 'La fecha no puede ser futura',
        })}
      />
      {errors.birthDate && <span className="form-error">{errors.birthDate.message}</span>}

      <label htmlFor="province">Provincia / País</label>
      <select
        id="province"
        className={errors.province ? 'input-error' : ''}
        {...register('province', { required: 'Elegí una provincia o país' })}
      >
        <option value="">Seleccionar...</option>
        {PROVINCES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      {errors.province && <span className="form-error">{errors.province.message}</span>}

      <div className="form-actions">
        {isEdit && (
          <button type="button" className="btn-secondary-outline" onClick={onCancel}>
            Cancelar edición
          </button>
        )}
        <button type="submit" className="btn-primary btn-lg" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : submitText}
        </button>
      </div>
    </form>
  )
}

export default UserForm
