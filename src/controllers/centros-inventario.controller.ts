import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Centros,
  Inventario,
} from '../models';
import {CentrosRepository} from '../repositories';

export class CentrosInventarioController {
  constructor(
    @repository(CentrosRepository) protected centrosRepository: CentrosRepository,
  ) { }

  @get('/centros/{id}/inventario', {
    responses: {
      '200': {
        description: 'Centros has one Inventario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Inventario),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inventario>,
  ): Promise<Inventario> {
    return this.centrosRepository.inventario(id).get(filter);
  }

  @post('/centros/{id}/inventario', {
    responses: {
      '200': {
        description: 'Centros model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inventario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Centros.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {
            title: 'NewInventarioInCentros',
            exclude: ['id'],
            optional: ['centrosId']
          }),
        },
      },
    }) inventario: Omit<Inventario, 'id'>,
  ): Promise<Inventario> {
    return this.centrosRepository.inventario(id).create(inventario);
  }

  @patch('/centros/{id}/inventario', {
    responses: {
      '200': {
        description: 'Centros.Inventario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventario, {partial: true}),
        },
      },
    })
    inventario: Partial<Inventario>,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.centrosRepository.inventario(id).patch(inventario, where);
  }

  @del('/centros/{id}/inventario', {
    responses: {
      '200': {
        description: 'Centros.Inventario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inventario)) where?: Where<Inventario>,
  ): Promise<Count> {
    return this.centrosRepository.inventario(id).delete(where);
  }
}
