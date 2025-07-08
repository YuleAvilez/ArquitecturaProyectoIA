import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";
import { GlobalException } from "../../../utils/globalException";

export const GetAllSurveyQuestions = async () => {
    try {
        const response = await axios.get(`${API_URL}/surveyQuestion/getAll`);
        return response.data;
    } catch (error) {
         GlobalException(error);
    }
};