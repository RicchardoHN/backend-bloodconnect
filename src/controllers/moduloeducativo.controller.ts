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
import {ModuloEducativo} from '../models';
import {ModuloEducativoRepository} from '../repositories';

export class ModuloeducativoController {
  constructor(
    @repository(ModuloEducativoRepository)
    public moduloEducativoRepository : ModuloEducativoRepository,
  ) {}

  @post('/modulo-educativos')
  @response(200, {
    description: 'ModuloEducativo model instance',
    content: {'application/json': {schema: getModelSchemaRef(ModuloEducativo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModuloEducativo, {
            title: 'NewModuloEducativo',
            exclude: ['id'],
          }),
        },
      },
    })
    moduloEducativo: Omit<ModuloEducativo, 'id'>,
  ): Promise<ModuloEducativo> {
    return this.moduloEducativoRepository.create(moduloEducativo);
  }

  @get('/modulo-educativos/count')
  @response(200, {
    description: 'ModuloEducativo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ModuloEducativo) where?: Where<ModuloEducativo>,
  ): Promise<Count> {
    return this.moduloEducativoRepository.count(where);
  }

  @get('/modulo-educativos')
  @response(200, {
    description: 'Array of ModuloEducativo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ModuloEducativo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ModuloEducativo) filter?: Filter<ModuloEducativo>,
  ): Promise<ModuloEducativo[]> {
    return this.moduloEducativoRepository.find(filter);
  }

  @patch('/modulo-educativos')
  @response(200, {
    description: 'ModuloEducativo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModuloEducativo, {partial: true}),
        },
      },
    })
    moduloEducativo: ModuloEducativo,
    @param.where(ModuloEducativo) where?: Where<ModuloEducativo>,
  ): Promise<Count> {
    return this.moduloEducativoRepository.updateAll(moduloEducativo, where);
  }

  @get('/modulo-educativos/{id}')
  @response(200, {
    description: 'ModuloEducativo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ModuloEducativo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ModuloEducativo, {exclude: 'where'}) filter?: FilterExcludingWhere<ModuloEducativo>
  ): Promise<ModuloEducativo> {
    return this.moduloEducativoRepository.findById(id, filter);
  }

  @patch('/modulo-educativos/{id}')
  @response(204, {
    description: 'ModuloEducativo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ModuloEducativo, {partial: true}),
        },
      },
    })
    moduloEducativo: ModuloEducativo,
  ): Promise<void> {
    await this.moduloEducativoRepository.updateById(id, moduloEducativo);
  }

  @put('/modulo-educativos/{id}')
  @response(204, {
    description: 'ModuloEducativo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() moduloEducativo: ModuloEducativo,
  ): Promise<void> {
    await this.moduloEducativoRepository.replaceById(id, moduloEducativo);
  }

  @del('/modulo-educativos/{id}')
  @response(204, {
    description: 'ModuloEducativo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.moduloEducativoRepository.deleteById(id);
  }
}
