// src/services/api/user/surveyService.js
export async function fetchSurvey() {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/api/survey", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("No autorizado. Inicia sesión.");
  return res.json(); // suponiendo que devuelves info del usuario
}
