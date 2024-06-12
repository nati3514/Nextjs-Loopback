import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {PessoaRepository} from './repositories/pessoa.repository';
import {ProfissaoRepository} from './repositories/profissao.repository';
import {MySequence} from './sequence';

export {ApplicationConfig};

export class PessoaProfissaoApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  async migrateSchema(options?: SchemaMigrationOptions) {
    // 1. Run migration scripts provided by connectors
    await super.migrateSchema({...options, models: ['Profissao', 'Pessoa']});

    // 2. Make further changes. It assumes that 'npm run migrate' was executed with `-- --rebuild` flags, otherwise there will be duplicated entries.
    const profissaoRepo = await this.getRepository(ProfissaoRepository);
    const profissaoCount = await profissaoRepo.count();
    let programador, profissionalDeRH, medico;
    if (profissaoCount.count === 0) {
      programador = await profissaoRepo.create({
        nome: 'Programador',
      });
      profissionalDeRH = await profissaoRepo.create({
        nome: 'Profissional de RH',
      });
      medico = await profissaoRepo.create({
        nome: 'Médico',
      });
    }
    const pessoaRepo = await this.getRepository(PessoaRepository);
    const pessoaCount = await pessoaRepo.count();
    if (pessoaCount.count === 0) {
      await pessoaRepo.create({
        nome: 'Murilo Hoias Teixeira',
        dataNascimento: '1999-12-31',
        cpf: '12345678901',
        profissaoId: programador?.id ?? 1,
      });
      await pessoaRepo.create({
        nome: 'Junio de Souza',
        dataNascimento: '1999-11-31',
        cpf: '45678901234',
        profissaoId: programador?.id ?? 1,
      });
      await pessoaRepo.create({
        nome: 'Guilherme Matheus da Silva',
        dataNascimento: '1999-10-31',
        cpf: '78901234567',
        profissaoId: profissionalDeRH?.id ?? 2,
      });
      await pessoaRepo.create({
        nome: 'Rodrigo Marques Gonçalves',
        dataNascimento: '1999-09-31',
        cpf: '01234567890',
        profissaoId: medico?.id ?? 3,
      });
    }
  }
}
