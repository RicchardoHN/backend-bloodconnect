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
  Usuarios,
  Citas,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosCitasController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/citas', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Citas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Citas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Citas>,
  ): Promise<Citas[]> {
    return this.usuariosRepository.citas(id).find(filter);
  }

  @post('/usuarios/{id}/citas', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Citas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Citas, {
            title: 'NewCitasInUsuarios',
            exclude: ['id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) citas: Omit<Citas, 'id'>,
  ): Promise<Citas> {
    return this.usuariosRepository.citas(id).create(citas);
  }

  @patch('/usuarios/{id}/citas', {
    responses: {
      '200': {
        description: 'Usuarios.Citas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Citas, {partial: true}),
        },
      },
    })
    citas: Partial<Citas>,
    @param.query.object('where', getWhereSchemaFor(Citas)) where?: Where<Citas>,
  ): Promise<Count> {
    return this.usuariosRepository.citas(id).patch(citas, where);
  }

  @del('/usuarios/{id}/citas', {
    responses: {
      '200': {
        description: 'Usuarios.Citas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Citas)) where?: Where<Citas>,
  ): Promise<Count> {
    return this.usuariosRepository.citas(id).delete(where);
  }
}
