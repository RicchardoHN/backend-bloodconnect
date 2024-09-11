import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {ModuloEducativo, ModuloEducativoRelations} from '../models';

export class ModuloEducativoRepository extends DefaultCrudRepository<
  ModuloEducativo,
  typeof ModuloEducativo.prototype.id,
  ModuloEducativoRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(ModuloEducativo, dataSource);
  }
}
