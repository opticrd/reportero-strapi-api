module.exports = ({ env }) => 
{
  //console.log(process.env);

  return {
    connection: {
      client: 'mysql',
      connection: {
        host: process.env['DATABASE_HOST'] || 'localhost',
        port: process.env['DATABASE_PORT'] || 3306,
        database: process.env['DATABASE_NAME'] || 'reportero',
        user: process.env['DATABASE_USERNAME'] || 'root',
        password: process.env['DATABASE_PASSWORD'] || '',
        ssl: process.env['DATABASE_SSL'] || false,
      },
    },
  }
}
