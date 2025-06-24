export interface GenerateCareerDescriptionServiceInterface {
  handle(careerName: string): Promise<string>;
}
