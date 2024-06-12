import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'postgreDb',
  connector: 'postgresql',
  url: 'postgre://postgres:12345@localhost:5432/loopback',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '12345',
  database: 'loopback',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgreDbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'postgreDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postgreDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
