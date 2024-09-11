import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Citas, Notificaciones} from '../models';
import {CitasRepository} from './citas.repository';
import {NotificacionesRepository} from './notificaciones.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly citas: HasManyRepositoryFactory<Citas, typeof Usuarios.prototype.id>;

  public readonly notificaciones: HasManyRepositoryFactory<Notificaciones, typeof Usuarios.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('CitasRepository') protected citasRepositoryGetter: Getter<CitasRepository>, @repository.getter('NotificacionesRepository') protected notificacionesRepositoryGetter: Getter<NotificacionesRepository>,
  ) {
    super(Usuarios, dataSource);
    this.notificaciones = this.createHasManyRepositoryFactoryFor('notificaciones', notificacionesRepositoryGetter,);
    this.registerInclusionResolver('notificaciones', this.notificaciones.inclusionResolver);
    this.citas = this.createHasManyRepositoryFactoryFor('citas', citasRepositoryGetter,);
    this.registerInclusionResolver('citas', this.citas.inclusionResolver);
  }
}
