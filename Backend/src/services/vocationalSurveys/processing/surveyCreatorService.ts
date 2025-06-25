import { Transaction } from "sequelize";
import { Inject, Service } from "typedi";
import { UserVocationalRequestDto } from "../../../models/userVocationalResponses/dto/userVocationalRequestDto";
import { UserVocationalResponses } from "../../../models/userVocationalResponses/model/userVocationalResponsesModel";
import { VocationalSurveyProcessingRequestDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyProcessingRequestDto";
import { VocationalSurveyRequestDto } from "../../../models/vocationalSurveys/dto/vocationalSurveyRequestDto";
import { VocationalSurveys } from "../../../models/vocationalSurveys/model/vocationalSurveysModel";
import { GenericRepository } from "../../../repositories/GenericRepository";

@Service()
export class SurveyCreatorService {

    constructor(
        @Inject("VocationalSurveyRepository")
        private readonly _repository: GenericRepository<
            VocationalSurveyRequestDto,
            VocationalSurveys>,
        @Inject("UserVocationalSurveyRepository")
        private readonly _userVocationalRepository: GenericRepository<
            UserVocationalRequestDto,
            UserVocationalResponses>
    ) { }

    async handle(request: VocationalSurveyProcessingRequestDto, transaction: Transaction): Promise<VocationalSurveys> {
        try {
            const savedSurvey = await this._repository.create({
                userId: request.userId,
            }, { transaction });

            console.log(savedSurvey, "savedSurvey");

            const plain = savedSurvey.get({ plain: true });

            for (const answer of request.surveyAnswers!) {
                const userVocational: UserVocationalRequestDto = {
                    vocationalSurveyId: plain.vocationalSurveyId,
                    surveyQuestionId: answer.surveyQuestionId,
                    answer: answer.answer
                }
                await this._userVocationalRepository.create(userVocational, { transaction })
            }

            return plain;
        } catch (error) {
            throw error;
        }
    }
}