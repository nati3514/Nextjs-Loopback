import Profissão from './Profissao';

  type Pessoa = {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
    telefone?: string;
    observacoes?: string;
    profissaoId: number;
    profissao: Profissão;
  };

export default Pessoa;
  