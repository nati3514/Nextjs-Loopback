import type { GetServerSideProps, NextPage } from 'next'
import { profissaoService } from 'services'
import type { Profissao } from 'types'
import Link from 'next/link';

interface Props {
  profissao: Profissao;
  }


const Ver: NextPage<Props> = ({profissao}) => {

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
              <td>{profissao.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{profissao.nome}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}
export default Ver

export const getServerSideProps : GetServerSideProps = async ({ params }) => {
    const profissao = params?.id && typeof params.id === 'string' ? await profissaoService.getById(parseInt(params?.id)): null;
    return {
        props: { profissao }
    }
}