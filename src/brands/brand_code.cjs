const { Client } = require('pg')

const pg = new Client({
  user: 'db_user',
  host: 'db',
  database: 'stock_db',
  password: 'passw0rd',
  port: 5432,
})


pg.connect()

pg.query('SELECT * FROM brand_details', (err, result) => {
  if (err) throw err;
  console.log(result.rows[0])
  pg.end()
})
