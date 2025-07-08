export const GlobalException = (error) => {
  if (!error.response) {
    throw "Error de red o el servidor no está disponible.";
  } else {
    throw error.response.data.message;
  }
}