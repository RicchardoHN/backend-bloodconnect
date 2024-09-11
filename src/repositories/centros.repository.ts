import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Centros, CentrosRelations} from '../models';

export class CentrosRepository extends DefaultCrudRepository<
  Centros,
  typeof Centros.prototype.id,
  CentrosRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Centros, dataSource);
  }
}
