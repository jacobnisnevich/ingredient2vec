const fs = require('fs');
const path = require('path');

const cocktailRecipeDatasetLines = fs
  .readFileSync(path.resolve(__dirname, '../data/cocktail-recipe-dataset.tsv'), 'utf8')
  .split('\n');

const cocktailRecipes = {};

for (let i = 1; i < cocktailRecipeDatasetLines.length; i++) {
  if (!cocktailRecipeDatasetLines[i]) continue;

  const [cocktailId, cocktailName, ingredientId, ingredientName, quantityUnit, quantityAmount, source] =
    cocktailRecipeDatasetLines[i].split('\t');

  if (cocktailRecipes[cocktailId]) {
    if (cocktailRecipes[cocktailId].recipes[source]) {
      cocktailRecipes[cocktailId].recipes[source] = [
        ...cocktailRecipes[cocktailId].recipes[source],
        {
          ingredientId,
          ingredientName,
          quantityUnit,
          quantityAmount
        }
      ];
    } else {
      cocktailRecipes[cocktailId] = {
        cocktailName,
        recipes: {
          ...cocktailRecipes[cocktailId].recipes,
          [source]: [
            {
              ingredientId,
              ingredientName,
              quantityUnit,
              quantityAmount
            }
          ]
        }
      };
    }
  } else {
    cocktailRecipes[cocktailId] = {
      cocktailName,
      recipes: {
        [source]: [
          {
            ingredientId,
            ingredientName,
            quantityUnit,
            quantityAmount
          }
        ]
      }
    };
  }
}

fs.writeFileSync(path.join(__dirname, '../data/cocktail-recipes.json'), JSON.stringify(cocktailRecipes, null, 2));
