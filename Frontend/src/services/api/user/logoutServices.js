import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";

export const Logout = async(refreshToken) => {
  try {

    const response = await axios.post(`${API_URL}/deleteSession/${refreshToken}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;

  } catch (error) {
    throw error.response.data.message;
  }
}
