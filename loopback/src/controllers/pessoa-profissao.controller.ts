import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pessoa,
  Profissao,
} from '../models';
import {PessoaRepository} from '../repositories';

export class PessoaProfissaoController {
  constructor(
    @repository(PessoaRepository)
    public pessoaRepository: PessoaRepository,
  ) { }

  @get('/pessoas/{id}/profissao', {
    responses: {
      '200': {
        description: 'Profissao belonging to Pessoa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Profissao)},
          },
        },
      },
    },
  })
  async getProfissao(
    @param.path.number('id') id: typeof Pessoa.prototype.id,
  ): Promise<Profissao> {
    return this.pessoaRepository.profissao(id);
  }
}
