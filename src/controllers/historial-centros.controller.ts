import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Historial,
  Centros,
} from '../models';
import {HistorialRepository} from '../repositories';

export class HistorialCentrosController {
  constructor(
    @repository(HistorialRepository)
    public historialRepository: HistorialRepository,
  ) { }

  @get('/historials/{id}/centros', {
    responses: {
      '200': {
        description: 'Centros belonging to Historial',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Centros),
          },
        },
      },
    },
  })
  async getCentros(
    @param.path.string('id') id: typeof Historial.prototype.id,
  ): Promise<Centros> {
    return this.historialRepository.centros(id);
  }
}
