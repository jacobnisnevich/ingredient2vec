const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');

const ingredientEmbeddings = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/ingredient-embeddings.json'), 'utf8')
);

const connection = mysql.createConnection({
  host: 'cocktails-restored.cksaafhhhze5.us-west-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: process.env.COCKTAIL_DB_PASSWORD,
  database: 'cocktails'
});

const sql = 'INSERT INTO ingredient_embedding (id, ingredientId, embeddingJson) VALUES ?';
const values = Object.values(ingredientEmbeddings).map(({ id, embedding }) => [
  uuidv4(),
  id,
  JSON.stringify(embedding)
]);

connection.query(sql, [values], function (error) {
  if (error) throw error;
  connection.end();
});
