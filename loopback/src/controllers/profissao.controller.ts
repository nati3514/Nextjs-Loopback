import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Profissao} from '../models';
import {ProfissaoRepository} from '../repositories';

export class ProfissaoController {
  constructor(
    @repository(ProfissaoRepository)
    public profissaoRepository : ProfissaoRepository,
  ) {}

  @post('/profissoes')
  @response(200, {
    description: 'Profissao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Profissao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profissao, {
            title: 'NewProfissao',
            exclude: ['id'],
          }),
        },
      },
    })
    profissao: Omit<Profissao, 'id'>,
  ): Promise<Profissao> {
    return this.profissaoRepository.create(profissao);
  }

  @get('/profissoes/count')
  @response(200, {
    description: 'Profissao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Profissao) where?: Where<Profissao>,
  ): Promise<Count> {
    return this.profissaoRepository.count(where);
  }

  @get('/profissoes')
  @response(200, {
    description: 'Array of Profissao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Profissao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Profissao) filter?: Filter<Profissao>,
  ): Promise<Profissao[]> {
    return this.profissaoRepository.find(filter);
  }

  @patch('/profissoes')
  @response(200, {
    description: 'Profissao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profissao, {partial: true}),
        },
      },
    })
    profissao: Profissao,
    @param.where(Profissao) where?: Where<Profissao>,
  ): Promise<Count> {
    return this.profissaoRepository.updateAll(profissao, where);
  }

  @get('/profissoes/{id}')
  @response(200, {
    description: 'Profissao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Profissao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Profissao, {exclude: 'where'}) filter?: FilterExcludingWhere<Profissao>
  ): Promise<Profissao> {
    return this.profissaoRepository.findById(id, filter);
  }

  @patch('/profissoes/{id}')
  @response(204, {
    description: 'Profissao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profissao, {partial: true}),
        },
      },
    })
    profissao: Profissao,
  ): Promise<void> {
    await this.profissaoRepository.updateById(id, profissao);
  }

  @put('/profissoes/{id}')
  @response(204, {
    description: 'Profissao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() profissao: Profissao,
  ): Promise<void> {
    await this.profissaoRepository.replaceById(id, profissao);
  }

  @del('/profissoes/{id}')
  @response(204, {
    description: 'Profissao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.profissaoRepository.deleteById(id);
  }
}
