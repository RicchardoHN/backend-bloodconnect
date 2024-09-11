import {Entity, model, property} from '@loopback/repository';

@model()
export class Centros extends Entity {
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
  nombreCentro: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  horarioAtencion: string;

  @property({
    type: 'object',
    required: true,
  })
  ubicacion: object;


  constructor(data?: Partial<Centros>) {
    super(data);
  }
}

export interface CentrosRelations {
  // describe navigational properties here
}

export type CentrosWithRelations = Centros & CentrosRelations;
