import OpenAI from "openai";
import { Service } from "typedi";
import { GenerateCareerDescriptionServiceInterface } from "../../../interfaces/services/vocationalSurvey/generateCareerDescriptionServiceInterface";

@Service()
export class GenerateCareerDescriptionService
  implements GenerateCareerDescriptionServiceInterface {
  private readonly openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async handle(careerName: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Eres un orientador vocacional. Al darte el nombre de una carrera, responde con una breve descripción clara, motivadora y en una sola frase. Escribe en lenguaje neutro, sin asumir género (ni masculino ni femenino). Evita palabras como "experto", "experta", "pionero", "pionera", "profesional", etc., y usa expresiones inclusivas como "quien estudia esta carrera", "la persona que elige este camino", etc. Solo texto, sin comillas ni formato.`
          },
          { role: "user", content: careerName },
        ],
        temperature: 0.7,
      });

      const content = completion.choices[0].message?.content?.trim();

      if (!content)
        throw new Error("No se recibió contenido de respuesta desde ChatGPT.");

      return content;
    } catch (error) {
      console.error(`Error generando descripción para ${careerName}:`, error);
      throw error;
    }
  }
}
