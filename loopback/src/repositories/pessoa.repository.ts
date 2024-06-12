import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgreDbDataSource} from '../datasources';
import {Pessoa, PessoaRelations, Profissao} from '../models';
import {ProfissaoRepository} from './profissao.repository';

export class PessoaRepository extends DefaultCrudRepository<
  Pessoa,
  typeof Pessoa.prototype.id,
  PessoaRelations
> {

  public readonly profissao: BelongsToAccessor<Profissao, typeof Pessoa.prototype.id>;

  constructor(
    @inject('datasources.postgreDb') dataSource: PostgreDbDataSource, @repository.getter('ProfissaoRepository') protected profissaoRepositoryGetter: Getter<ProfissaoRepository>,
  ) {
    super(Pessoa, dataSource);
    this.profissao = this.createBelongsToAccessorFor('profissao', profissaoRepositoryGetter,);
    this.registerInclusionResolver('profissao', this.profissao.inclusionResolver);
  }
}
