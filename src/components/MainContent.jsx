// MainContent.jsx
// Este componente es el "centro" de la página: lo que cambia según la sección.
// Recibe "seccion" desde App.jsx ("deportes" o "academico") para decidir qué mostrar.

import { useState, useEffect } from 'react'

import { queryGraphQL } from '../services/api.js'

// La consulta va afuera del componente porque no cambia (mismo estilo que OPCIONES del Sidebar).
const GET_DATA_QUERY = `
    query {
        characters(page: 1) {
            results {
                id
                name
                image
            }
        }
    }
`;

export function MainContent({ seccion }) {

    // Corregido: las tarjetas ahora son estado con useState, antes era una
    // constante y por eso fallaba al llamar setCards.
    const [cards, setCards] = useState([
        { title: "Tarjeta 1", imagen: "Imagen de la tarjeta 1", description: "Descripción de la tarjeta 1" },
        { title: "Tarjeta 2", imagen: "Imagen de la tarjeta 2", description: "Descripción de la tarjeta 2" }
    ])

    const [busqueda, setBusqueda] = useState("")
    const [cargando, setCargando] = useState(false)

    useEffect(() => {
        setCargando(true)
        queryGraphQL(GET_DATA_QUERY).then(data => {
            // Corregido: la API devuelve "name", así que lo guardamos como "title"
            // para que el filtro y la tarjeta lo puedan usar.
            const mapeados = data.characters.results.map((character) => ({
                title: character.name,
                imagen: character.image,
                description: `Personaje de la API (ID ${character.id})`
            }))
            setCards(mapeados)
            setCargando(false)
        }).catch(error => {
            console.error("Error al obtener datos:", error)
            setCargando(false)
        })
    }, [])

    // Cambia el título de la pestaña cada vez que cambia la sección
    useEffect(() => {
        document.title = seccion === "deportes" ? "Deportes - UlsaHub" : "Académico - UlsaHub"

        // Al salir de esta sección (por ejemplo a Perfil) vuelve al título normal
        return () => {
            document.title = "Ulsa Hub"
        }
    }, [seccion])

    // Corregido: ahora se filtra por "title", que es lo que sí tienen las tarjetas.
    const cardsFiltradas = cards.filter(card => card.title.toLowerCase().includes(busqueda.toLowerCase()))

  return (
    // <main> es la etiqueta semántica del contenido principal (solo debe haber una por página)
    <main className="main-content">

        {/* PANEL: el cuadro blanco que contiene todo */}
        <div className="panel">
            <input 
                type="text" 
                placeholder="Buscar tarjetas..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                // Corregido: la clase de Bootstrap va en minúsculas (form-control).
                className="form-control"
            />
            {/* 1. HERO: título grande de bienvenida, cambia según la sección */}
            <section className="hero">

                <h1>{seccion === "deportes" ? "Deportes" : "Académico"}</h1>

                <p>Texto corto que explica de qué trata esta sección.</p>
            </section>

            {/* 2. CONTENIDO PRINCIPAL: una cuadrícula de tarjetas */}
            {/* Corregido: se agregó el contenedor .cards para que el grid del CSS funcione */}
            <div className="cards">
                {/* Spinner de Bootstrap dentro del área de tarjetas mientras cargan los datos */}
                {cargando ? (
                    <div className="cards-cargando">
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : (
                    cardsFiltradas.map((card) => (
                        // Cada <article> es una tarjeta independiente (ya sin <hr/> suelto)
                        <article className="card" key={card.title}>
                            <img src={card.imagen} alt={card.title} />
                            <h2>{card.title}</h2>
                            <p>{card.description}</p>
                            <a href="#">Ver más</a>
                        </article>
                    ))
                )}
            </div>

        </div>

        {/* 3. LATERAL (opcional): info secundaria, como próximos partidos o avisos */}
        {/* Corregido: el aside ahora es hermano de .panel para que el flex lo ponga al lado */}
        <aside className="sidebar">
            <h3>Próximamente</h3>
            <ul>
            <li>Elemento 1</li>
            <li>Elemento 2</li>
            </ul>
        </aside>
    </main>
  );
}
