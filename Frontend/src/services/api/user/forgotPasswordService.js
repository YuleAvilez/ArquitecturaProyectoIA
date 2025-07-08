// src/services/api/user/forgotPasswordService.js
import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";
export const forgotPassword = async ({ correo }) => {
  try {
    const response = await axios.post(`${API_URL}/user/forgot-password`, { correo }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error inesperado",
    };
  }
};

