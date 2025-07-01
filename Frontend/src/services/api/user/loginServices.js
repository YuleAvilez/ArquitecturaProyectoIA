import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";

export const Login = async(request) => {
  try {

    const response = await axios.post(`${API_URL}/login`, request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;

  } catch (error) {
    console.error("Error en el servicio de inicio de sesión:", error);
    throw error.response.data.message;
  }
}
