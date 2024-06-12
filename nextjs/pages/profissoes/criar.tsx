import { profissaoService } from 'services';
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react';
const Criar: NextPage = () => {

  const [nome, setNome] = useState("");

  const handleSubmit = async (event:React.SyntheticEvent) => {
    event.preventDefault();
    const response = await profissaoService.create({ nome });
    if (response?.failed) {
      alert(`Houve um erro na sua submissão: ${response.status} ${response.error}`);
    } else {
      setNome("");
      alert(`Successfully created profession`);
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
        <h3>Create Profession</h3>
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
          <input className="waves-effect waves-light btn" type="submit" value="Save" />
        </form>
      </div>
    );
}
export default Criar

