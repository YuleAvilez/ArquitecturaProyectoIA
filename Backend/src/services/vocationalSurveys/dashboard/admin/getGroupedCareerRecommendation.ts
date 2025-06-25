import { Inject, Service } from "typedi";
import { CareerRecomendationRequestDto } from "../../../../models/careerRecommendations/dto/careerRecomendationRequestDto";
import { CareerRecommendations } from "../../../../models/careerRecommendations/model/careerRecommendationsModel";
import { GenericRepository } from "../../../../repositories/GenericRepository";

@Service()
export class GetGroupedCareerRecommendations {
    constructor(
        @Inject("CareerRecommendationRepository")
        private readonly _careerRecommendationRepository: GenericRepository<
            CareerRecomendationRequestDto,
            CareerRecommendations
        >
    ) { }

    async handle(): Promise<{ careerName: string; count: number }[]> {
        try {
            const careerRecommendations =
                await this._careerRecommendationRepository.getAll({
                    attributes: [
                        "careerNameNormalize",
                        [
                            this._careerRecommendationRepository.sequelize.fn(
                                "COUNT",
                                this._careerRecommendationRepository.sequelize.col(
                                    "careerNameNormalize"
                                )
                            ),
                            "count",
                        ],
                    ],
                    group: ["careerNameNormalize"],
                    order: [
                        [
                            this._careerRecommendationRepository.sequelize.literal("count"),
                            "DESC",
                        ],
                    ],
                });

            return careerRecommendations.map((item: any) => {
                const plain = item.get({ plain: true });
                return {
                    careerName: plain.careerNameNormalize,
                    count: plain.count,
                };
            });

        } catch (error) {
            throw error;
        }
    }
}