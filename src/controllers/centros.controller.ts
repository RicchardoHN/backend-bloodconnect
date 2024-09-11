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
import {Centros} from '../models';
import {CentrosRepository} from '../repositories';

export class CentrosController {
  constructor(
    @repository(CentrosRepository)
    public centrosRepository : CentrosRepository,
  ) {}

  @post('/centros')
  @response(200, {
    description: 'Centros model instance',
    content: {'application/json': {schema: getModelSchemaRef(Centros)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Centros, {
            title: 'NewCentros',
            exclude: ['id'],
          }),
        },
      },
    })
    centros: Omit<Centros, 'id'>,
  ): Promise<Centros> {
    return this.centrosRepository.create(centros);
  }

  @get('/centros/count')
  @response(200, {
    description: 'Centros model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Centros) where?: Where<Centros>,
  ): Promise<Count> {
    return this.centrosRepository.count(where);
  }

  @get('/centros')
  @response(200, {
    description: 'Array of Centros model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Centros, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Centros) filter?: Filter<Centros>,
  ): Promise<Centros[]> {
    return this.centrosRepository.find(filter);
  }

  @patch('/centros')
  @response(200, {
    description: 'Centros PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Centros, {partial: true}),
        },
      },
    })
    centros: Centros,
    @param.where(Centros) where?: Where<Centros>,
  ): Promise<Count> {
    return this.centrosRepository.updateAll(centros, where);
  }

  @get('/centros/{id}')
  @response(200, {
    description: 'Centros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Centros, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Centros, {exclude: 'where'}) filter?: FilterExcludingWhere<Centros>
  ): Promise<Centros> {
    return this.centrosRepository.findById(id, filter);
  }

  @patch('/centros/{id}')
  @response(204, {
    description: 'Centros PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Centros, {partial: true}),
        },
      },
    })
    centros: Centros,
  ): Promise<void> {
    await this.centrosRepository.updateById(id, centros);
  }

  @put('/centros/{id}')
  @response(204, {
    description: 'Centros PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() centros: Centros,
  ): Promise<void> {
    await this.centrosRepository.replaceById(id, centros);
  }

  @del('/centros/{id}')
  @response(204, {
    description: 'Centros DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.centrosRepository.deleteById(id);
  }
}
