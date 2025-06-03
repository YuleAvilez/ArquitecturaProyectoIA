export interface SessionDeleteServiceInterface {
  /**
   * Maneja la eliminación de un elemento.
   * @param request {refreshToken}
   */
  handle(refreshToken: string): Promise<boolean>;
}
