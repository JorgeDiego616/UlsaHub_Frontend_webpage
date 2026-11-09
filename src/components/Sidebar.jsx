import '../components-css/Sidebar.css' // Estilos propios de este componente

import { useState } from 'react'

// Lista de opciones. Está afuera del componente porque no cambia,
// así no se vuelve a crear en cada render.
//const OPCIONES = [
  //{ id: 'deportes', etiqueta: 'Deportes' },
  //{ id: 'academico', etiqueta: 'Académico' },
  //{ id: 'perfil', etiqueta: 'Perfil' },
//]


// Recibe dos props desde App.jsx:
// - vistaActual: la vista que está activa (para resaltar su botón)
// - onCambiarVista: función que se llama al hacer clic en una opción
export function Sidebar({ vistaActual, onCambiarVista }) {
    const [sections, setSections] = useState([
    { id: 'deportes', etiqueta: 'Deportes' },
    { id: 'academico', etiqueta: 'Académico' },
    { id: 'perfil', etiqueta: 'Perfil' }
    ]);
  return (
    // Usamos <div> y no <aside> porque App.jsx ya envuelve este componente en un <aside>
    <div className="sidebar-izquierdo">
      <h3 className="sidebar-titulo">Menú</h3>

      <ul className="sidebar-lista">
        {/* .map crea un <li> por cada opción; key ayuda a React a identificarlos */}
        {sections.map((opcion) => (
          <li key={opcion.id}>
            <button
              // Si es la vista activa se agrega la clase "activo" para resaltarla
              className={`sidebar-boton ${vistaActual === opcion.id ? 'activo' : ''}`}
              onClick={() => onCambiarVista(opcion.id)}
            >
              {opcion.etiqueta}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}