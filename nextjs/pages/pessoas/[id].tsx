import type { GetServerSideProps, NextPage } from 'next'
import { pessoaService } from 'services'
import type { Pessoa } from 'types'
import Link from 'next/link';

interface Props {
    pessoa: Pessoa;
  }


const Ver: NextPage<Props> = ({pessoa}) => {

    const dataNascimento = new Date(pessoa.dataNascimento).toLocaleDateString()

    return (
      <div className="container">
        <h3>
          <Link href={`/`}>
            <a className="waves-effect waves-light btn">
              <i className="material-icons small">arrow_back</i>
            </a>
          </Link>
        </h3>
        <table className="striped">
          <tbody>
            <tr>
              <td>ID</td>
              <td>{pessoa.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{pessoa.nome}</td>
            </tr>
            <tr>
              <td>Date of birth</td>
              <td>{dataNascimento}</td>
            </tr>
            <tr>
              <td>Idnumber</td>
              <td>{pessoa.cpf}</td>
            </tr>
            <tr>
              <td>Profession</td>
              <td>{pessoa.profissao?.nome}</td>
            </tr>
            <tr>
              <td>Telephone</td>
              <td>{pessoa.telefone}</td>
            </tr>
            <tr>
              <td>Comments</td>
              <td>{pessoa.observacoes}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}
export default Ver

export const getServerSideProps : GetServerSideProps = async ({ params }) => {
    const pessoa = params?.id && typeof params.id === 'string' ? await pessoaService.getById(parseInt(params?.id)): null;
    return {
        props: { pessoa }
    }
}