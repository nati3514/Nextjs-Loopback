import { pessoaService, profissaoService } from 'services';
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react';
import type { Profissao } from 'types';


interface Props {
  profissoes: Profissao[];
}

const Criar: NextPage<Props> = ({profissoes}) => {

  const [nome, setNome] = useState("");
  const [cpf , setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [profissaoId, setProfissaoId] = useState(profissoes[0]?.id);


  const handleSubmit = async (event:React.SyntheticEvent) => {
    event.preventDefault();
    if (!profissaoId) {
      alert(`There are no professions to be assigned. Please create a profession before creating a person.`);
      return false;
    }
    const params = { nome, cpf, dataNascimento, telefone, observacoes, profissaoId }
    const response = await pessoaService.create(params);
    if (response?.failed) {
      alert(`There was an error in your submission: ${response.status} ${response.error}`);
    } else {
      setNome("");
      setCpf("");
      setDataNascimento("");
      setTelefone("");
      setObservacoes("");
      setProfissaoId(profissoes[0]?.id);
      alert(`Successfully created person`);
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
        <h3>Create Person</h3>
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

          <input type="submit" className="waves-effect waves-light btn mt-10" value="Save" />
        </form>
      </div>
    );
}
export default Criar

export const getServerSideProps : GetServerSideProps = async ({ params }) => {
  const profissoes = await profissaoService.getAll()
  return {
      props: { profissoes }
  }
}