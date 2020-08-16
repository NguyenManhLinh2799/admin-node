const { Client } = require('pg')
const connectionString = 'postgresql://postgres:linh@localhost:5432/note-management'

module.exports = new Client({
  connectionString: connectionString,
})