import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Centros} from './centros.model';

@model()
export class Historial extends Entity {
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
  tipoMovimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoSangre: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @belongsTo(() => Centros)
  centrosId: string;

  constructor(data?: Partial<Historial>) {
    super(data);
  }
}

export interface HistorialRelations {
  // describe navigational properties here
}

export type HistorialWithRelations = Historial & HistorialRelations;
