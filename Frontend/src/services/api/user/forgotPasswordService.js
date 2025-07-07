export const forgotPassword = async ({ Correo }) => {
  try {
    const response = await fetch("http://localhost:3001/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Correo }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Error inesperado" };
    }

    return { success: true, message: data.message, token: data.token };
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    return { success: false, message: "Error de conexión" };
  }
};
