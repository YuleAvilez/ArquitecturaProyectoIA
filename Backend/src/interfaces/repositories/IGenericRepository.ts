import { CreateOptions, FindOptions, UpdateOptions } from "sequelize";

export interface IGenericRepository<TRequest, TModel> {
  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @returns {Promise<TModel>}
   */
  create(request: TRequest, options?: CreateOptions<TModel>): Promise<TModel>;

  /**
   * Obtener todos los elementos.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<TModel[]>}
   */
  getAll(options?: FindOptions<TModel>): Promise<TModel[]>;

  /**
   * Obtener todos los elementos paginados.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<TModel[]>}
   */
  getAndCountAll(
    options?: FindOptions<TModel>
  ): Promise<{ rows: TModel[]; count: number }>;

  /**
   * Obtener un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<TModel>}
   */
  getOne(options: FindOptions<TModel>): Promise<TModel | null>;

  /**
   * Actualizar un elemento.
   * @param options - Parámetros de búsqueda.
   * @param request - Datos para actualizar.
   * @returns {Promise<TModel>}
   */
  update(request: TRequest, options: UpdateOptions<TModel>): Promise<TModel>;

  /**
   * Eliminar un elemento.
   * @param options - Parámetros de búsqueda.
   * @returns {Promise<boolean>}
   */
  delete(options: FindOptions<TModel>): Promise<boolean>;
}
