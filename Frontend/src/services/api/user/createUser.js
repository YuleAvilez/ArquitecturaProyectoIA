import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";

export const CreateUser = async (request) => {
  const response = await axios.post(`${API_URL}/login`, request, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
