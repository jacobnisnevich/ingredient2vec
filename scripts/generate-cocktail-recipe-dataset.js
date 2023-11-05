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

connection.query(
  `SELECT c.id as cocktailId, c.name as cocktail, i.id as ingredientId, i.name as ingredient, ii.quantityAmount, ii.quantityUnit, cr.id as cocktailRecipeId from cocktail c
left join cocktail_recipe cr on cr.cocktailId = c.id
LEFT join ingredient_info ii on ii.cocktailRecipeId = cr.id
LEFT join ingredient i on i.id = ii.ingredientId`,
  (error, rows) => {
    if (error) {
      console.error(error);
      return;
    }

    const tsvFile = fs.createWriteStream(path.resolve(__dirname, '../data/cocktail-recipe-dataset.tsv'));

    tsvFile.write('cocktailId\tcocktail\tingredientId\tingredient\tquantityAmount\tquantityUnit\tcocktailRecipeId\n');

    rows.forEach(row => {
      tsvFile.write(
        `${row.cocktailId}\t${row.cocktail}\t${row.ingredientId}\t${row.ingredient}\t${row.quantityAmount}\t${row.quantityUnit}\t${row.cocktailRecipeId}\n`
      );
    });

    tsvFile.close();
    connection.end();
  }
);
