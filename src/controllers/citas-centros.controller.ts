import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Citas,
  Centros,
} from '../models';
import {CitasRepository} from '../repositories';

export class CitasCentrosController {
  constructor(
    @repository(CitasRepository)
    public citasRepository: CitasRepository,
  ) { }

  @get('/citas/{id}/centros', {
    responses: {
      '200': {
        description: 'Centros belonging to Citas',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Centros),
          },
        },
      },
    },
  })
  async getCentros(
    @param.path.string('id') id: typeof Citas.prototype.id,
  ): Promise<Centros> {
    return this.citasRepository.centros(id);
  }
}
