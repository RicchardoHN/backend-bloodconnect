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
  Notificaciones,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosNotificacionesController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Notificaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Notificaciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Notificaciones>,
  ): Promise<Notificaciones[]> {
    return this.usuariosRepository.notificaciones(id).find(filter);
  }

  @post('/usuarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notificaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {
            title: 'NewNotificacionesInUsuarios',
            exclude: ['id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) notificaciones: Omit<Notificaciones, 'id'>,
  ): Promise<Notificaciones> {
    return this.usuariosRepository.notificaciones(id).create(notificaciones);
  }

  @patch('/usuarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Usuarios.Notificaciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {partial: true}),
        },
      },
    })
    notificaciones: Partial<Notificaciones>,
    @param.query.object('where', getWhereSchemaFor(Notificaciones)) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.usuariosRepository.notificaciones(id).patch(notificaciones, where);
  }

  @del('/usuarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Usuarios.Notificaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Notificaciones)) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.usuariosRepository.notificaciones(id).delete(where);
  }
}
