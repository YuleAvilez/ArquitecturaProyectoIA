import {
  CreateOptions,
  DestroyOptions,
  FindOptions,
  UpdateOptions,
} from "sequelize";
import { Model, ModelCtor } from "sequelize-typescript";
import { IGenericRepository } from "../interfaces/repositories/IGenericRepository";
import { context } from "./context";

export class GenericRepository<
  TRequest extends Partial<TModel["_creationAttributes"]>,
  TModel extends Model
> implements IGenericRepository<TRequest, TModel>
{
  /**
   * Instancia del modelo Sequelize.
   */
  private _context: ModelCtor<TModel>;

  constructor(modelName: keyof typeof context) {
    this._context = context[modelName] as ModelCtor<TModel>;
  }

  public get model() {
    return this._context;
  }

  async getById(id: number): Promise<TModel | null> {
  return await this.model.findByPk(id);
}

  public get sequelize() {
    return this._context.sequelize!;
  }

  /**
   * Crear un nuevo elemento.
   * @param request - Datos a crear.
   * @param options - Opciones de creación.
   * @returns {Promise<TModel>}
   * @throws Error si ocurre un problema durante la creación.
   */
  async create(request: TRequest, options?: CreateOptions): Promise<TModel> {
    try {
      const response = await this._context.create(
        request as TModel["_creationAttributes"],
        options
      );

      return response;
    } catch (error) {
      throw new Error(
        `Error guardando una entidad: ${(error as Error).message}`
      );
    }
  }

  /**
   * Obtener todos los elementos.
   * @param options - Opciones de búsqueda.
   * @returns {Promise<TModel[]>}
   * @throws Error si ocurre un problema al obtener los datos.
   */
  async getAll(options?: FindOptions<TModel>): Promise<TModel[]> {
    try {
      return await this._context.findAll(options);
    } catch (error) {
      throw new Error(
        `Error obteniendo todas las entidades: ${(error as Error).message}`
      );
    }
  }

  /**
   * Obtener todos los elementos paginados.
   * @param options - Opciones de búsqueda.
   * @returns {Promise<{ rows: TModel[]; count: number }>}
   * @throws Error si ocurre un problema al obtener los datos.
   */
  async getAndCountAll(
    options?: FindOptions<TModel>
  ): Promise<{ rows: TModel[]; count: number }> {
    try {
      return await this._context.findAndCountAll(options);
    } catch (error) {
      throw new Error(
        `Error obteniendo todas las entidades: ${(error as Error).message}`
      );
    }
  }

  /**
   * Obtener un solo elemento.
   * @param options - Opciones de búsqueda.
   * @returns {Promise<TModel | null>}
   * @throws Error si ocurre un problema al obtener la entidad.
   */
  async getOne(options: FindOptions<TModel>): Promise<TModel | null> {
    try {
      return await this._context.findOne(options);
    } catch (error) {
      throw new Error(
        `Error obteniendo una entidad: ${(error as Error).message}`
      );
    }
  }

  /**
   * Actualizar un elemento.
   * @param request - Datos a actualizar.
   * @param options - Condición de búsqueda para actualizar.
   * @returns {Promise<TModel>}
   * @throws Error si la entidad no se encuentra o hay un error en la actualización.
   */
  async update(
    request: Partial<TRequest>,
    options: UpdateOptions<TModel>
  ): Promise<TModel> {
    try {
      if (!options?.where) {
        throw new Error("Debe especificarse una condición para actualizar.");
      }

      await this._context.update(request, options);
      const updated = await this._context.findOne(options);

      if (!updated) {
        throw new Error("Elemento no encontrado para actualizar.");
      }

      return updated;
    } catch (error) {
      throw new Error(
        `Error actualizando una entidad: ${(error as Error).message}`
      );
    }
  }
  

  /**
   * Eliminar un elemento.
   * @param options - parámetro de búsqueda.
   * @returns {Promise<boolean>}
   * @throws Error si ocurre un problema durante la eliminación.
   */
  async delete(options: DestroyOptions<TModel>): Promise<boolean> {
    try {
      if (!options?.where) {
        throw new Error("Debe especificarse una condición para eliminar.");
      }

      const deletedCount = await this._context.destroy(options);

      return deletedCount > 0;
    } catch (error) {
      throw new Error(
        `Error eliminando una entidad: ${(error as Error).message}`
      );
    }
  }
}
