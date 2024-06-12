import type { GetServerSideProps, NextPage } from 'next'
import { profissaoService } from 'services'
import type { Profissao } from 'types'
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  profissao: Profissao;
}


const Editar: NextPage<Props> = ({ profissao }) => {

  const [nome, setNome] = useState(profissao.nome);

  const handleSubmit = async (event:React.SyntheticEvent) => {
    event.preventDefault();
    const response = await profissaoService.update(profissao.id, { nome });
    if (response?.failed) {
      alert(`Houve um erro na sua submissão: ${response.status} ${response.error}`);
    } else {
      alert(`Profissão alterada com sucesso`);
    }
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
    <h3>Edit Profession</h3>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>
      <input className="waves-effect waves-light btn" type="submit" value="Update" />
    </form>
  </div>
  );
};
export default Editar

export const getServerSideProps : GetServerSideProps = async ({ params }) => {
    const profissao = params?.id && typeof params.id === 'string' ? await profissaoService.getById(parseInt(params?.id)): null;
    return {
        props: { profissao }
    }
}
