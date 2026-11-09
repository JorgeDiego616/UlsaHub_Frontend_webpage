import { useState } from 'react'
import './App.css'

import { NavBar } from './components/NavBar.jsx'
import { Footer } from './components/Footer.jsx'
import { MainContent } from './components/MainContent.jsx'
import { Login } from './components/Login.jsx'
import { Sidebar } from './components/Sidebar.jsx'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  // Vista activa. Los valores coinciden con los "id" de las opciones del Sidebar
  const [vistaActual, setVistaActual] = useState('deportes')

  return (
    <>
      {token ? (
        <>
          <NavBar />
            <div className="layout">
              {/* Grid de Bootstrap: container centra, row crea la fila y col-* reparte las columnas */}
              <div className="container">
                <div className="row g-3">

                  {/* Sidebar: 12 columnas en móvil y 3 en pantallas medianas o más */}
                  <aside className="col-12 col-md-3">
                    <Sidebar vistaActual={vistaActual} onCambiarVista={setVistaActual} />
                  </aside>

                  {/* Contenido: 12 columnas en móvil y 9 en pantallas medianas o más */}
                  <div className="col-12 col-md-9">

                    {vistaActual === 'deportes' && <MainContent seccion="deportes" />}

                    {vistaActual === 'academico' && <MainContent seccion="academico" />}

                    {vistaActual === 'perfil' && (
                      <div><span>Perfil</span></div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          <Footer />
        </>
      ) : (
        <Login onLoginSuccess={(newToken) => setToken(newToken)} />
      )}
    </>
  )
}

export default App