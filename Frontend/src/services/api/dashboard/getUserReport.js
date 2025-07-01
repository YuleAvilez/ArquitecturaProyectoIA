import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";

export const GetUserReport = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/userReport/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error in GetUserReport:", error.response.data.message);
        throw error.response.data.message;
    }
};
