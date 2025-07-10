// src/services/api/user/changePasswordService.js
import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";

export const changePasswordService = async ({
  userId,
  currentPassword,
  newPassword,
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/changePassword`,
      {
        userId,
        currentPassword,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      message: response.data.message || "Contraseña actualizada con éxito",
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error inesperado",
    };
  }
};
