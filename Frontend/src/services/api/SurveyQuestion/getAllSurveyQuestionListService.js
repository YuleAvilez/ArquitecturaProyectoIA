import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";

export const GetAllSurveyQuestionsList = async () => {
    try {
        const response = await axios.get(`${API_URL}/surveyQuestion/getAllList`);
        return response.data;
    } catch (error) {
         GlobalException(error);
    }
};