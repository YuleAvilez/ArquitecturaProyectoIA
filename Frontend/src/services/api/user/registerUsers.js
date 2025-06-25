export async function register({ Nombres, Apellidos, Correo, Contraseña, Sexo }) {
  try {
    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Nombres, Apellidos, Correo, Contraseña, Sexo }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error desconocido");
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
