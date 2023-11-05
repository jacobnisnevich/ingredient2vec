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

const sql = 'DELETE FROM ingredient_embedding';

connection.query(sql, function (error) {
  if (error) throw error;
  connection.end();
});
