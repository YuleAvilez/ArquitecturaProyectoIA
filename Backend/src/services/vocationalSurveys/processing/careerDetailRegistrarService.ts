import { Transaction } from "sequelize";
import { Inject, Service } from "typedi";
import { GenerateCareerDetailsServiceInterface } from "../../../interfaces/services/vocationalSurvey/generateCareerDetailsServiceInterface";
import { CareerDetailRequestDto } from "../../../models/careerDetails/dto/careerDetailRequestDto";
import { CareerDetailResponseDto } from "../../../models/careerDetails/dto/careerDetailResponseDto";
import { CareerDetails } from "../../../models/careerDetails/model/careerDetailsModel";
import { CareerRecommendationResponseDto } from "../../../models/careerRecommendations/dto/careerRecomendationResponseDto";
import { GenericRepository } from "../../../repositories/GenericRepository";
import { normalizeText } from "../../../utils";

@Service()
export class CareerDetailRegistrarService {

    constructor(
        @Inject("GenerateCareerDetailsServiceInterface")
        private readonly _generateCreerDetailsService: GenerateCareerDetailsServiceInterface,
        @Inject("CareerDetailRepository")
        private readonly _careerDetailRepository: GenericRepository<
            CareerDetailRequestDto,
            CareerDetails
        >,
    ) { }

    async handle(careersIA: CareerRecommendationResponseDto[], transaction: Transaction): Promise<CareerDetailResponseDto[]> {
        try {
            // Almacena los detalles de las carreras
            const resultado: CareerDetailResponseDto[] = [];

            for (const career of careersIA) {
                const normalizedCareerName = normalizeText(career.careerName!);

                const existed = await this._careerDetailRepository.getOne({
                    where: { careerNameNormalize: normalizedCareerName },
                });

                const mapped = existed?.get({ plain: true });

                if (mapped) {
                    resultado.push({
                        careerName: mapped.careerName,
                        salary: mapped.salary,
                        trends: JSON.parse(mapped.trends),
                        sources: JSON.parse(mapped.sources),
                    });
                } else {
                    const careerDetails = await this._generateCreerDetailsService.handle(
                        career.careerName!
                    );

                    await this._careerDetailRepository.create({
                        careerName: careerDetails.careerName,
                        careerNameNormalize: normalizeText(careerDetails.careerName!),
                        salary: careerDetails.salary,
                        trends: JSON.stringify(careerDetails.trends),
                        sources: JSON.stringify(careerDetails.sources),
                    }, { transaction });

                    resultado.push(careerDetails);
                }
            }

            return resultado;
        } catch (error) {
            throw error;
        }
    }
}