// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    client: "pg",
    connection: 'postres://postgres:postgres@localhost/postgres',
    ssl: true,
    debug: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname+'/../migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname+'/../seeds'
    }
  },


  staging: {
    client: 'pg',
    connection: {
      host:     'localhost',
      charset:  'utf8',
      database: 'postgres',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname+'/../migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname+'/../seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host:     'localhost',
      charset:  'utf8',
      database: 'postgres',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname+'/../migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: __dirname+'/../seeds'
    }
  }

};
