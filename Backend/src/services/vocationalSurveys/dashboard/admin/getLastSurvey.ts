import { Inject, Service } from "typedi";
import { mapper } from "../../../../config/mapper";
import { CareerRecommendations } from "../../../../models/careerRecommendations/model/careerRecommendationsModel";
import { SurveyQuestions } from "../../../../models/surveyQuestions/model/surveyQuestionsModel";
import { UserVocationalResponses } from "../../../../models/userVocationalResponses/model/userVocationalResponsesModel";
import { VocationalSurveyRequestDto } from "../../../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationalSurveyResponseDto } from "../../../../models/vocationalSurveys/dto/vocationalSurveyResponseDto";
import { VocationalSurveys } from "../../../../models/vocationalSurveys/model/vocationalSurveysModel";
import { GenericRepository } from "../../../../repositories/GenericRepository";

@Service()
export class GetLastSurvey {
    constructor(
        @Inject("VocationalSurveyRepository")
        private readonly _repository: GenericRepository<
            VocationalSurveyRequestDto,
            VocationalSurveys
        >,) { }

    async handle(): Promise<VocationalSurveyResponseDto> {
        try {
            const lastSurvey = await this._repository.getAll({
                order: [["createdAt", "DESC"]],
                limit: 1,
                include: [
                    {
                        model: UserVocationalResponses,
                        as: "responses",
                        include: [{ model: SurveyQuestions, as: "question" }],
                    },
                    {
                        model: CareerRecommendations,
                        as: "recommendations",
                    },
                ],
            });

            const mappedData = mapper.mapArray(
                lastSurvey,
                VocationalSurveys,
                VocationalSurveyResponseDto
            );

            return mappedData[0];
        } catch (error) {
            throw error;
        }
    }
}