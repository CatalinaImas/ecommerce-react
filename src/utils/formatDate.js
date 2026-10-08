// Convierte la fecha guardada en MockAPI a un texto legible (dd/mm/aaaa)
// Acepta fechas ISO ("2026-10-05T12:00:00.000Z") y timestamps en segundos
export function formatDate(value) {
  if (!value) return '-'

  let date
  if (typeof value === 'number' || /^\d+$/.test(String(value))) {
    const n = Number(value)
    date = new Date(n < 1e12 ? n * 1000 : n)
  } else {
    date = new Date(value)
  }

  if (Number.isNaN(date.getTime())) return '-'
  return date.toLocaleDateString('es-AR')
}
