const fs = require('fs');
const path = require('path');

const ingredientDatasetLines = fs
  .readFileSync(path.resolve(__dirname, '../data/ingredient-dataset.tsv'), 'utf8')
  .split('\n');
const ingredientEmbeddingsLines = fs.readFileSync(path.resolve(__dirname, '../emb/ingredient.emb'), 'utf8').split('\n');

const ingredients = {};

for (let i = 1; i < ingredientDatasetLines.length; i++) {
  if (!ingredientDatasetLines[i]) continue;

  const [id, parentId, name] = ingredientDatasetLines[i].split('\t');
  ingredients[i] = { id, parentId, name };
}

for (let i = 1; i < ingredientEmbeddingsLines.length; i++) {
  if (!ingredientDatasetLines[i]) continue;

  const [index, ...embedding] = ingredientEmbeddingsLines[i].split(' ');

  ingredients[index] = { ...ingredients[index], embedding };
}

const ingredientsById = Object.fromEntries(
  Object.entries(ingredients).map(([, ingredientData]) => [ingredientData.id, ingredientData])
);

fs.writeFileSync(
  path.resolve(__dirname, '../data/ingredient-embeddings.json'),
  JSON.stringify(ingredientsById, null, 2)
);
