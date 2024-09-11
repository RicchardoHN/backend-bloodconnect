import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Centros} from './centros.model';

@model()
export class Citas extends Entity {
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
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'date',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Centros)
  centrosId: string;

  constructor(data?: Partial<Citas>) {
    super(data);
  }
}

export interface CitasRelations {
  // describe navigational properties here
}

export type CitasWithRelations = Citas & CitasRelations;
