import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Historial, HistorialRelations, Centros} from '../models';
import {CentrosRepository} from './centros.repository';

export class HistorialRepository extends DefaultCrudRepository<
  Historial,
  typeof Historial.prototype.id,
  HistorialRelations
> {

  public readonly centros: BelongsToAccessor<Centros, typeof Historial.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CentrosRepository') protected centrosRepositoryGetter: Getter<CentrosRepository>,
  ) {
    super(Historial, dataSource);
    this.centros = this.createBelongsToAccessorFor('centros', centrosRepositoryGetter,);
    this.registerInclusionResolver('centros', this.centros.inclusionResolver);
  }
}
