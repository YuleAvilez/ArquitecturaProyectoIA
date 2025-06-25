import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";

export const GetAdminReport = async () => {
    try {
        const response = await axios.get(`${API_URL}/adminReport`);

        return response.data;
    } catch (error) {
        throw error;
    }
};
