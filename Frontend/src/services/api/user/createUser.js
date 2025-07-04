import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";
import { GlobalException } from "./globalException";

export const CreateUser = async (request) => {
  try {
    const response = await axios.post(`${API_URL}/user/create`, request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    GlobalException(error);
  }
};
