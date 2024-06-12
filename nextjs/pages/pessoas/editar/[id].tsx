import type { GetServerSideProps, NextPage } from 'next'
  import { pessoaService, profissaoService } from 'services';
  import type { Pessoa, Profissao } from 'types'
  import { useState } from 'react';
  import Link from 'next/link';

interface Props {
    pessoa: Pessoa;
    profissoes: Profissao[];
  }

const Editar: NextPage<Props> = ({ pessoa, profissoes }) => {

    const propsDataNascimento = new Date(pessoa.dataNascimento).toISOString().split('T')[0];
  
    const [nome, setNome] = useState(pessoa.nome);
    const [cpf , setCpf] = useState(pessoa.cpf);
    const [dataNascimento, setDataNascimento] = useState(propsDataNascimento);
    const [telefone, setTelefone] = useState(pessoa.telefone??'');
    const [observacoes, setObservacoes] = useState(pessoa.observacoes??'');
    const [profissaoId, setProfissaoId] = useState(pessoa.profissaoId);
  
  
    const handleSubmit = async (event:React.SyntheticEvent) => {
      event.preventDefault();
      const params = { nome, cpf, dataNascimento, telefone, observacoes, profissaoId }
      const response = await pessoaService.update(pessoa.id, params);
      if (response?.failed) {
        alert(`Houve um erro na sua submissão: ${response.status} ${response.error}`);
      } else {
        alert(`Pessoa alterada com sucesso`);
      }
    }
  
    const selectStyle: React.CSSProperties = {
      display: 'inline-block',
    }
  
      return (
        <div className="container">
          <h3>
            <Link href={`/`}>
              <a className="waves-effect waves-light btn">
                <i className="material-icons small">arrow_back</i>
              </a>
            </Link>
          </h3>
          <h3>Edit Person</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                required
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </label>
            <label htmlFor="dataNascimento">Date of Birth</label>
            <input
                required
                id="dataNascimento"
              type="date"
              className="validate"
              name="dataNascimento"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            ></input>
            <label htmlFor="cpf">Idnumber</label>
            <input
                required
                id="cpf"
              type="text"
              className="validate"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            ></input>
            <label htmlFor="telefone">Telephone</label>
            <input
                id="telefone"
              type="text"
              className="validate"
              name="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            ></input>
            <label htmlFor="textarea">Comments</label>
            <textarea
              id="textarea"
              className="materialize-textarea"
              onChange={(e) => setObservacoes(e.target.value)}
              name="textarea"
              defaultValue={observacoes}
            ></textarea>
            <label htmlFor="profissaoId">Professions</label>
            <select required value={profissaoId} onChange={(e) => setProfissaoId(parseInt(e.target.value))} name="profissaoId" style={selectStyle} disabled={profissoes.length === 0}>
                  <option value="DEFAULT" disabled>
                    Escolha uma profissão...
                  </option>
                  {profissoes.map((profissao) => (
                    <option key={profissao.id} value={profissao.id}>
                      {profissao.nome}
                    </option>
                  ))}
                </select>
  
            <input type="submit" className="waves-effect waves-light btn mt-10" value="Update" />
          </form>
        </div>
      );
  }
 
export default Editar

export const getServerSideProps : GetServerSideProps = async ({ params }) => {
    const pessoa = params?.id && typeof params.id === 'string' ? await pessoaService.getById(parseInt(params?.id)): null;
    const profissoes = await profissaoService.getAll()
    return {
        props: { pessoa , profissoes}
    }
}