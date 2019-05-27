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
      tableName: 'knex_migrations'
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
      tableName: 'knex_migrations'
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
      tableName: 'knex_migrations'
    }
  }

};