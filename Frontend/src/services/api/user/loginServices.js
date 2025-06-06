export async function login({ email, password, role }) {
  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    }); 

    if (!res.ok) throw new Error('Credenciales inválidas');
    const data = await res.json();
    return { success: true, token: data.token };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
