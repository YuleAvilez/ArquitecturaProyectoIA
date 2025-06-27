import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";

export const GetAllUsers = async (page = 1, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/user/pagination`, {
            params: { page, size }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};
