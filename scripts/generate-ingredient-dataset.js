const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'cocktails-restored.cksaafhhhze5.us-west-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: process.env.COCKTAIL_DB_PASSWORD,
  database: 'cocktails'
});

connection.query(`SELECT id, parentId, name from ingredient`, (error, rows) => {
  if (error) {
    console.error(error);
    return;
  }

  const tsvFile = fs.createWriteStream(path.resolve(__dirname, '../data/ingredient-dataset.tsv'));

  tsvFile.write('id\tparentId\tname\n');

  rows.forEach(row => {
    tsvFile.write(`${row.id}\t${row.parentId}\t${row.name}\n`);
  });

  tsvFile.close();
  connection.end();
});
