import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Centros, CentrosRelations, Inventario} from '../models';
import {InventarioRepository} from './inventario.repository';

export class CentrosRepository extends DefaultCrudRepository<
  Centros,
  typeof Centros.prototype.id,
  CentrosRelations
> {

  public readonly inventario: HasOneRepositoryFactory<Inventario, typeof Centros.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('InventarioRepository') protected inventarioRepositoryGetter: Getter<InventarioRepository>,
  ) {
    super(Centros, dataSource);
    this.inventario = this.createHasOneRepositoryFactoryFor('inventario', inventarioRepositoryGetter);
    this.registerInclusionResolver('inventario', this.inventario.inclusionResolver);
  }
}
