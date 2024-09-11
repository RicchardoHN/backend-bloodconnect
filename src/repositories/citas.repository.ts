import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Citas, CitasRelations, Centros} from '../models';
import {CentrosRepository} from './centros.repository';

export class CitasRepository extends DefaultCrudRepository<
  Citas,
  typeof Citas.prototype.id,
  CitasRelations
> {

  public readonly centros: BelongsToAccessor<Centros, typeof Citas.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CentrosRepository') protected centrosRepositoryGetter: Getter<CentrosRepository>,
  ) {
    super(Citas, dataSource);
    this.centros = this.createBelongsToAccessorFor('centros', centrosRepositoryGetter,);
    this.registerInclusionResolver('centros', this.centros.inclusionResolver);
  }
}
