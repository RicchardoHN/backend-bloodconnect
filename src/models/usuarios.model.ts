import {Entity, model, property, hasMany} from '@loopback/repository';
import {Citas} from './citas.model';
import {Notificaciones} from './notificaciones.model';

@model()
export class Usuarios extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoSangre: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: string;

  @hasMany(() => Citas)
  citas: Citas[];

  @hasMany(() => Notificaciones)
  notificaciones: Notificaciones[];

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
