const fs = require('fs');
const path = require('path');

const cocktailRecipes = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/cocktail-recipes.json'), 'utf8'));
const ingredientEmbeddings = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/ingredient-embeddings.json'), 'utf8')
);

const multiplyVectorByScalar = (vector, scalar) => {
  return vector.map(component => component * scalar);
};

const addVectors = (vectorA, vectorB) => {
  return vectorA.map((componentA, index) => `${parseFloat(componentA) + parseFloat(vectorB[index])}`);
};

const computeEmbedding = ingredientData => {
  const scaledVectors = ingredientData.map(ingredient => {
    // For now 1:1 scale
    return ingredientEmbeddings[ingredient.ingredientId].embedding;
  });

  return scaledVectors.reduce(addVectors, new Array(scaledVectors[0].length).fill(0));
};

const cocktailEmbeddings = Object.fromEntries(
  Object.entries(cocktailRecipes).map(([cocktailId, cocktailData]) => {
    const { cocktailName, recipes } = cocktailData;

    return [
      cocktailId,
      {
        cocktailName,
        recipes: Object.fromEntries(
          Object.entries(recipes).map(([source, ingredientData]) => {
            return [source, computeEmbedding(ingredientData)];
          })
        )
      }
    ];
  })
);

fs.writeFileSync(
  path.resolve(__dirname, '../data/cocktail-embeddings.json'),
  JSON.stringify(cocktailEmbeddings, null, 2)
);
