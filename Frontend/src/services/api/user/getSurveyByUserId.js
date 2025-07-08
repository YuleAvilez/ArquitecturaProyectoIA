import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";
import { GlobalException } from "../../../utils/globalException";

export const GetSurveyByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/getSurveyByUserId/${userId}`);

        return response.data;
    } catch (error) {
        GlobalException(error);
    }
};
