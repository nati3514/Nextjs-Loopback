import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Pessoa, Profissao} from '../models';
import {ProfissaoRepository} from '../repositories';

export class ProfissaoPessoaController {
  constructor(
    @repository(ProfissaoRepository)
    protected profissaoRepository: ProfissaoRepository,
  ) {}

  @get('/profissoes/{id}/pessoas', {
    responses: {
      '200': {
        description: 'Array of Profissao has many Pessoa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pessoa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pessoa>,
  ): Promise<Pessoa[]> {
    return this.profissaoRepository.pessoas(id).find(filter);
  }

  @post('/profissoes/{id}/pessoas', {
    responses: {
      '200': {
        description: 'Profissao model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pessoa)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Profissao.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pessoa, {
            title: 'NewPessoaInProfissao',
            exclude: ['id'],
            optional: ['profissaoId'],
          }),
        },
      },
    })
    pessoa: Omit<Pessoa, 'id'>,
  ): Promise<Pessoa> {
    return this.profissaoRepository.pessoas(id).create(pessoa);
  }

  @patch('/profissoes/{id}/pessoas', {
    responses: {
      '200': {
        description: 'Profissao.Pessoa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pessoa, {partial: true}),
        },
      },
    })
    pessoa: Partial<Pessoa>,
    @param.query.object('where', getWhereSchemaFor(Pessoa))
    where?: Where<Pessoa>,
  ): Promise<Count> {
    return this.profissaoRepository.pessoas(id).patch(pessoa, where);
  }

  @del('/profissoes/{id}/pessoas', {
    responses: {
      '200': {
        description: 'Profissao.Pessoa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pessoa))
    where?: Where<Pessoa>,
  ): Promise<Count> {
    return this.profissaoRepository.pessoas(id).delete(where);
  }
}
