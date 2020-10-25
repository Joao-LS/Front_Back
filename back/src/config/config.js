module.exports = {
    development: {
        database: {
            host: 'localhost',
            port: 3306,
            name: "db_estabelecimento",
            dialect: 'mysql',
            user: 'root',
            password: 'j0a044574'
        }
    },
    production:{
        database: {
            host: process.env.DB_HOST,
            host: process.env.DB_PORT
        }
    }
}