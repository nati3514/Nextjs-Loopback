import {Entity, hasMany, model, property} from '@loopback/repository';
import {Pessoa, PessoaWithRelations} from './pessoa.model';

@model()
export class Profissao extends Entity {
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

  @hasMany(() => Pessoa)
  pessoas: Pessoa[];

  constructor(data?: Partial<Profissao>) {
    super(data);
  }
}

export interface ProfissaoRelations {
  // describe navigational properties here
  pessoas?: PessoaWithRelations[];
}

export type ProfissaoWithRelations = Profissao & ProfissaoRelations;
