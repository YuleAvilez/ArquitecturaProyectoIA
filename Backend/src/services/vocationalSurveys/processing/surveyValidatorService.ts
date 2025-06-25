import { validate } from "class-validator";
import { Service } from "typedi";
import { VocationalSurveyProcessingRequestDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyProcessingRequestDto";

@Service()
export class SurveyValidatorService {
    async validateInput(request: VocationalSurveyProcessingRequestDto) {
        const errors = await validate(request);

        if (errors?.length > 0) throw new Error("Enviar todos los datos.");
        if (!request.surveyAnswers) throw new Error("No se han enviado respuestas a la encuesta.");
        if (request.surveyAnswers.length < 13)
            throw new Error("Se deben responder todas las preguntas de la encuesta.");
    }
}
