import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";
import { GlobalException } from "../../../utils/globalException";
import { getUserIdFromToken } from './../../../utils/index';


export const ProcessingAnswers = async (request) => {
  try {
    const requestData = mapRequest(request);
    const response = await axios.post(`${API_URL}/processingAnswers`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al procesar las respuestas:", error);
  }
};

const mapRequest = (request) => {
    if (!Array.isArray(request) || request.length === 0) {
        console.error("Error: La solicitud no es válida o está vacía.");
        return [];
    }

    const userId = getUserIdFromToken();
    const surveyAnswers = [];

    request.map((item) => {

        item.forEach((question) => {
            if (
                typeof question !== "object" ||
                !question.id ||
                question.answer === undefined
            ) {
                console.error(
                    "Error: Cada pregunta debe ser un objeto con 'id' y 'answer'."
                );
                return;
            }

            surveyAnswers.push({
                surveyQuestionId: question.id,
                answer: question.answer,
            });
        });

    });

    const requestData = {userId:userId, surveyAnswers:surveyAnswers};
    return requestData
};
