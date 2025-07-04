import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";
import { GlobalException } from "./globalException";

export const Login = async(request) => {
  try {

    const response = await axios.post(`${API_URL}/login`, request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;

  } catch (error) {
    GlobalException(error);
  }
}
