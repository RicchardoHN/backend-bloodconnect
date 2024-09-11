import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Historial} from '../models';
import {HistorialRepository} from '../repositories';

export class HistorialController {
  constructor(
    @repository(HistorialRepository)
    public historialRepository : HistorialRepository,
  ) {}

  @post('/historials')
  @response(200, {
    description: 'Historial model instance',
    content: {'application/json': {schema: getModelSchemaRef(Historial)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historial, {
            title: 'NewHistorial',
            exclude: ['id'],
          }),
        },
      },
    })
    historial: Omit<Historial, 'id'>,
  ): Promise<Historial> {
    return this.historialRepository.create(historial);
  }

  @get('/historials/count')
  @response(200, {
    description: 'Historial model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Historial) where?: Where<Historial>,
  ): Promise<Count> {
    return this.historialRepository.count(where);
  }

  @get('/historials')
  @response(200, {
    description: 'Array of Historial model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Historial, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Historial) filter?: Filter<Historial>,
  ): Promise<Historial[]> {
    return this.historialRepository.find(filter);
  }

  @patch('/historials')
  @response(200, {
    description: 'Historial PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historial, {partial: true}),
        },
      },
    })
    historial: Historial,
    @param.where(Historial) where?: Where<Historial>,
  ): Promise<Count> {
    return this.historialRepository.updateAll(historial, where);
  }

  @get('/historials/{id}')
  @response(200, {
    description: 'Historial model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Historial, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Historial, {exclude: 'where'}) filter?: FilterExcludingWhere<Historial>
  ): Promise<Historial> {
    return this.historialRepository.findById(id, filter);
  }

  @patch('/historials/{id}')
  @response(204, {
    description: 'Historial PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Historial, {partial: true}),
        },
      },
    })
    historial: Historial,
  ): Promise<void> {
    await this.historialRepository.updateById(id, historial);
  }

  @put('/historials/{id}')
  @response(204, {
    description: 'Historial PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() historial: Historial,
  ): Promise<void> {
    await this.historialRepository.replaceById(id, historial);
  }

  @del('/historials/{id}')
  @response(204, {
    description: 'Historial DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.historialRepository.deleteById(id);
  }
}
