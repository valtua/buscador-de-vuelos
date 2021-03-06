"use strict";
// Importamos la función (que nos devuelve la fecha) para su uso en el fetch de la api
import { currentDate } from "./helpers.js";

// Función asíncrona para solicitar el token de acceso para la API
async function fetchToken() {
  try {
    const responseToken = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",

      //En este segundo argumento, se le pasan los datos necesarios para poder solicitar el token.
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials&client_id=DzFz6xgx71Nr8B1hOi2BUjZHxVFGCcb4&client_secret=n0fSOjZX4L1PNBKq",
      }
    );
    const dataToken = await responseToken.json();
    const token = dataToken.access_token;
    return token;
  } catch (error) {
    console.log(error);
  }
}
fetchToken();

export let response;
// Función asíncrona para solicitar la información requerida por nuestro usuario
export async function fetchApi(locations) {
  try {
    response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${
        locations.origin
      }&destinationLocationCode=${
        locations.destination
      }&departureDate=${currentDate()}&adults=1&nonStop=false&max=250`,
      { headers: { Authorization: `Bearer ${await fetchToken()}` } }
    );
    const results = await response.json();
    console.log(results.data[0]);
    return results.data[0];
    // Catch de errores
  } catch (error) {
    console.log(error);
  }
}
