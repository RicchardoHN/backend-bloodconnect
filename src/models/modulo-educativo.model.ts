import {Entity, model, property} from '@loopback/repository';

@model()
export class ModuloEducativo extends Entity {
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
  titulo: string;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaPublicacion: string;

  @property({
    type: 'string',
    required: true,
  })
  categoria: string;


  constructor(data?: Partial<ModuloEducativo>) {
    super(data);
  }
}

export interface ModuloEducativoRelations {
  // describe navigational properties here
}

export type ModuloEducativoWithRelations = ModuloEducativo & ModuloEducativoRelations;
