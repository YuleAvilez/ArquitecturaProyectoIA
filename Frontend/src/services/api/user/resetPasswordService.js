// src/services/api/user/resetPasswordService.js
import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";

export const resetPasswordService = async ({ token, newPassword }) => {
  try {
    const response = await axios.post(`${API_URL}/user/resetPassword`, {
      token,
      newPassword,
    });

    return { success: true, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error inesperado",
    };
  }
};
