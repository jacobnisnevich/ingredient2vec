const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');

const cocktailEmbeddings = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/cocktail-embeddings.json'), 'utf8')
);

const connection = mysql.createConnection({
  host: 'cocktails-restored.cksaafhhhze5.us-west-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: process.env.COCKTAIL_DB_PASSWORD,
  database: 'cocktails'
});

const sql = 'INSERT INTO cocktail_recipe_embedding (id, cocktailRecipeId, embeddingJson) VALUES ?';
const values = Object.values(cocktailEmbeddings).flatMap(({ recipes }) =>
  Object.entries(recipes).map(([cocktailRecipeId, embedding]) => [
    uuidv4(),
    cocktailRecipeId,
    JSON.stringify(embedding)
  ])
);

connection.query(sql, [values], function (error) {
  if (error) throw error;
  connection.end();
});
