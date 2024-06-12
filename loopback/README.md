This is a [LoopBack 4](https://loopback.io/) project bootstrapped with [`LoopBack 4 CLI`](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html)..

## Install Dependencies

```bash
npm install
```

## Start PostgreSQL Server

This project uses PostgreSQL as datasource. Please initialize a server and create a database. This project was developed using **PostgreSQL v14.5**.

Default details for host, port, database name and credentials may be found in:

```bash
/src/datasources/postgre-db.datasource.ts
```

#### Docker

For your convenience, a docker-compose file is provided. You can use it to start a PostgreSQL server with the following command:

```bash
docker-compose up -d
```

Remember to create a database and set the credentials in the datasource file. You may use the adminer interface available at http://localhost:8080 to create the database.

## Run Migrations

To create tables and insert some seed data, please run:

```bash
npm run migrate -- --rebuild
```

You may found seeding data on _migrateSchema_ at:

```bash
/src/application.ts
```

## Run Application

```sh
npm start
```

Open http://127.0.0.1:3000 in your browser.

## Linting

```sh
npm run lint
```
