require('dotenv').config()
module.exports = {
  development: {
    database: 'fitter_development',
    dialect: 'postgres'
  },
  test: {
    database: 'fitter_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
