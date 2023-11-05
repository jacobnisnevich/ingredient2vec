const fs = require('fs');
const path = require('path');

const cocktailRecipeDatasetLines = fs
  .readFileSync(path.resolve(__dirname, '../data/cocktail-recipe-dataset.tsv'), 'utf8')
  .split('\n');

const cocktailRecipes = {};

for (let i = 1; i < cocktailRecipeDatasetLines.length; i++) {
  if (!cocktailRecipeDatasetLines[i]) continue;

  const [cocktailId, cocktailName, ingredientId, ingredientName, quantityAmount, quantityUnit, source] =
    cocktailRecipeDatasetLines[i].split('\t');

  if (cocktailRecipes[cocktailId]) {
    if (cocktailRecipes[cocktailId].recipes[source]) {
      cocktailRecipes[cocktailId].recipes[source] = [
        ...cocktailRecipes[cocktailId].recipes[source],
        {
          ingredientId,
          ingredientName,
          quantityAmount,
          quantityUnit
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
              quantityAmount,
              quantityUnit
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
            quantityAmount,
            quantityUnit
          }
        ]
      }
    };
  }
}

fs.writeFileSync(path.join(__dirname, '../data/cocktail-recipes.json'), JSON.stringify(cocktailRecipes, null, 2));
