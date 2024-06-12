import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Profissao, ProfissaoWithRelations} from './profissao.model';

@model()
//   {
//   settings: {
//     foreignKeys: {
//       fkPessoaProfissaoId: {
//         name: 'fkPessoaProfissaoId',
//         entity: 'Profissao',
//         entityKey: 'id',
//         foreignKey: 'profissaoid',
//       },
//     },
//   },
// }
export class Pessoa extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'date',
    jsonSchema: {
      format: 'date',
    },
    postgresql: {
      dataType: 'date',
    },
    required: true,
  })
  dataNascimento: string;

  @property({
    type: 'string',
    required: true,
  })
  cpf: string;

  @property({
    type: 'string',
  })
  telefone?: string;

  @property({
    type: 'string',
  })
  observacoes?: string;

  @belongsTo(() => Profissao)
  profissaoId: number;

  constructor(data?: Partial<Pessoa>) {
    super(data);
  }
}

export interface PessoaRelations {
  // describe navigational properties here
  profissao?: ProfissaoWithRelations;
}

export type PessoaWithRelations = Pessoa & PessoaRelations;
