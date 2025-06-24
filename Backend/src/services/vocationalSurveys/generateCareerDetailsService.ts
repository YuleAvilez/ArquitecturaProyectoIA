import OpenAI from "openai";
import { Service } from "typedi";
import { GenerateCareerDetailsServiceInterface } from "../../interfaces/services/vocationalSurvey/generateCareerDetailsServiceInterface";
import { CareerDetailResponseDto } from "../../models/careerDetails/dto/careerDetailResponseDto";

@Service()
export class GenerateCareerDetailsService
  implements GenerateCareerDetailsServiceInterface
{
  private readonly openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async handle(careerName: string): Promise<CareerDetailResponseDto> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Eres un orientador vocacional con acceso a información actual.
                Al darte el nombre de una carrera profesional, responde en formato JSON con esta estructura:
                {
                    "salary": { "averageCOP": número },
                    "trends": [ "tendencia1", "tendencia2", "tendencia3" ],
                    "articles": [
                        { "title": "título del artículo", "url": "https://..." },
                        ...
                    ]
                }
            El salario promedio debe estar en pesos colombianos (COP). Las tendencias deben ser actuales. Los artículos deben ser reales y útiles. No incluyas explicaciones ni texto adicional.`,
          },
          { role: "user", content: careerName },
        ],
        temperature: 0.7,
      });

      const content = completion.choices[0].message?.content?.trim();

      if (!content)
        throw new Error("No se recibió contenido de respuesta desde ChatGPT.");

      let parsed: any;
      try {
        parsed = JSON.parse(content);
      } catch {
        throw new Error(
          "El contenido recibido no tiene un formato JSON válido."
        );
      }

      if (!parsed.salary || !parsed.trends || !parsed.articles) {
        throw new Error(
          "La respuesta de ChatGPT no contiene todos los campos requeridos."
        );
      }

      const response: CareerDetailResponseDto = {
        careerName,
        salary: parsed.salary.averageCOP,
        trends: parsed.trends,
        sources: parsed.articles,
      };

      return response;
    } catch (error) {
      console.error(
        `Error al generar detalles de la carrera "${careerName}":`,
        error
      );
      throw error;
    }
  }
}
