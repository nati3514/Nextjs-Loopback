import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgreDbDataSource} from '../datasources';
import {Profissao, ProfissaoRelations, Pessoa} from '../models';
import {PessoaRepository} from './pessoa.repository';

export class ProfissaoRepository extends DefaultCrudRepository<
  Profissao,
  typeof Profissao.prototype.id,
  ProfissaoRelations
> {

  public readonly pessoas: HasManyRepositoryFactory<Pessoa, typeof Profissao.prototype.id>;

  constructor(
    @inject('datasources.postgreDb') dataSource: PostgreDbDataSource, @repository.getter('PessoaRepository') protected pessoaRepositoryGetter: Getter<PessoaRepository>,
  ) {
    super(Profissao, dataSource);
    this.pessoas = this.createHasManyRepositoryFactoryFor('pessoas', pessoaRepositoryGetter,);
    this.registerInclusionResolver('pessoas', this.pessoas.inclusionResolver);
  }
}
