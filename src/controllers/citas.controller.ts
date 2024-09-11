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
import {Citas} from '../models';
import {CitasRepository} from '../repositories';

export class CitasController {
  constructor(
    @repository(CitasRepository)
    public citasRepository : CitasRepository,
  ) {}

  @post('/citas')
  @response(200, {
    description: 'Citas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Citas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Citas, {
            title: 'NewCitas',
            exclude: ['id'],
          }),
        },
      },
    })
    citas: Omit<Citas, 'id'>,
  ): Promise<Citas> {
    return this.citasRepository.create(citas);
  }

  @get('/citas/count')
  @response(200, {
    description: 'Citas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Citas) where?: Where<Citas>,
  ): Promise<Count> {
    return this.citasRepository.count(where);
  }

  @get('/citas')
  @response(200, {
    description: 'Array of Citas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Citas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Citas) filter?: Filter<Citas>,
  ): Promise<Citas[]> {
    return this.citasRepository.find(filter);
  }

  @patch('/citas')
  @response(200, {
    description: 'Citas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Citas, {partial: true}),
        },
      },
    })
    citas: Citas,
    @param.where(Citas) where?: Where<Citas>,
  ): Promise<Count> {
    return this.citasRepository.updateAll(citas, where);
  }

  @get('/citas/{id}')
  @response(200, {
    description: 'Citas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Citas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Citas, {exclude: 'where'}) filter?: FilterExcludingWhere<Citas>
  ): Promise<Citas> {
    return this.citasRepository.findById(id, filter);
  }

  @patch('/citas/{id}')
  @response(204, {
    description: 'Citas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Citas, {partial: true}),
        },
      },
    })
    citas: Citas,
  ): Promise<void> {
    await this.citasRepository.updateById(id, citas);
  }

  @put('/citas/{id}')
  @response(204, {
    description: 'Citas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() citas: Citas,
  ): Promise<void> {
    await this.citasRepository.replaceById(id, citas);
  }

  @del('/citas/{id}')
  @response(204, {
    description: 'Citas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.citasRepository.deleteById(id);
  }
}
