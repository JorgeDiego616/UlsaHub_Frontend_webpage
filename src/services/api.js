const GRAPHQL_API_URL = "https://rickandmortyapi.com/graphql"; // URL de la API GraphQL

export async function queryGraphQL(query, variables = {}) {

    const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local

    const cabeceras = {
        "Content-Type": "application/json",
    }


    if(token) {
        cabeceras["Authorization"] = `Bearer ${token}`; // Agrega el token a las cabeceras si existe
    }

    const cuerpoPeticion = JSON.stringify({
        query: query,
        variables: variables
    });

    const respuesta = await fetch(GRAPHQL_API_URL, {
        method: "POST",
        headers: cabeceras,
        body: cuerpoPeticion
    });

    // consvertir la respuesta a JS
    const resultadoJSON = await respuesta.json();

    if (resultadoJSON.errors) {
        console.error("Error en la consulta GraphQL:", resultadoJSON.errors);
        throw new Error("Error en la consulta GraphQL");
    }

    return resultadoJSON.data; // Devuelve solo la propiedad "data" de la respuesta
}