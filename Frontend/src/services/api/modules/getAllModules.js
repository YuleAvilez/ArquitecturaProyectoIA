import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";

export const GetAllModules = async () => {
    const response = await axios.get(`${API_URL}/modules/getAll`);
    return response.data;
};
