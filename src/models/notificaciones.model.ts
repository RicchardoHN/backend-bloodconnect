import {Entity, model, property} from '@loopback/repository';

@model()
export class Notificaciones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  usuariosId: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEnvio: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;


  constructor(data?: Partial<Notificaciones>) {
    super(data);
  }
}

export interface NotificacionesRelations {
  // describe navigational properties here
}

export type NotificacionesWithRelations = Notificaciones & NotificacionesRelations;
