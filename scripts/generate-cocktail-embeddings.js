const fs = require('fs');
const path = require('path');

const cocktailRecipes = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/cocktail-recipes.json'), 'utf8'));
const ingredientEmbeddings = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/ingredient-embeddings.json'), 'utf8')
);

const ozConversionRatios = {
  '14.5-oz': 14.5,
  barspoon: 0.1,
  barspoons: 0.1,
  bottle: 25.3605,
  'bottle (750 mL)': 25.3605,
  bunch: 0.1,
  cluster: 0.1,
  cup: 8,
  'cup (scant)': 8,
  cups: 8,
  dahes: 0.1,
  dash: 0.1,
  dashes: 0.1,
  drop: 0.1,
  drops: 0.1,
  'large scoop': 0.1,
  lb: 0.1,
  liter: 33.8141,
  'medium pieces': 0.1,
  mg: 0.1,
  ml: 0.033814,
  mL: 0.033814,
  oz: 1,
  'oz (scant)': 1,
  piece: 0.1,
  pinch: 0.1,
  pinches: 0.1,
  quart: 32,
  quarter: 0.1,
  scoop: 0.1,
  slice: 0.1,
  slices: 0.1,
  'small piece': 0.1,
  splash: 0.1,
  splashes: 0.1,
  spray: 0.1,
  sprig: 0.1,
  sprigs: 0.1,
  sprinkle: 0.1,
  sprinkles: 0.1,
  stalks: 0.1,
  stick: 0.1,
  sticks: 0.1,
  strip: 0.1,
  swipes: 0.1,
  tbsp: 0.5,
  tsp: 0.166667,
  'tsp (scant)': 0.166667,
  '': 0.1
};

const multiplyVectorByScalar = (vector, scalar) => {
  return vector.map(component => component * scalar);
};

const addVectors = (vectorA, vectorB) => {
  return vectorA.map((componentA, index) => `${parseFloat(componentA) + parseFloat(vectorB[index])}`);
};

const computeEmbedding = ingredientData => {
  const maximumScalar = ingredientData.reduce((maximumSoFar, ingredient) => {
    const { quantityAmount, quantityUnit } = ingredient;

    const conversionMultiplier = ozConversionRatios[quantityUnit];
    const scalar = parseFloat(quantityAmount) * conversionMultiplier;

    return Math.max(maximumSoFar, scalar);
  }, 0);

  const scaledVectors = ingredientData.map(ingredient => {
    const { ingredientId, quantityAmount, quantityUnit } = ingredient;
    const { embedding } = ingredientEmbeddings[ingredientId];

    const conversionMultiplier = ozConversionRatios[quantityUnit];
    const scalar = (parseFloat(quantityAmount) * conversionMultiplier) / maximumScalar;

    return multiplyVectorByScalar(embedding, scalar);
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
