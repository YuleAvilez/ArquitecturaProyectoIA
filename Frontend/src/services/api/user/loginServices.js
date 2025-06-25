export async function login({ Correo, Contraseña }) {
  try {
    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Correo, Contraseña }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    localStorage.setItem("token", data.token);
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
}
