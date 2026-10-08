function Loader({ text = 'Cargando...' }) {
  return (
    <div className="loader" role="status">
      <div className="loader__spinner" />
      <p>{text}</p>
    </div>
  )
}

export default Loader
