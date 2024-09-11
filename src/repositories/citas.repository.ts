import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Citas, CitasRelations} from '../models';

export class CitasRepository extends DefaultCrudRepository<
  Citas,
  typeof Citas.prototype.id,
  CitasRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Citas, dataSource);
  }
}
