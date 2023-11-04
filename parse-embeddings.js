const fs = require('fs');

const ingredientDatasetLines = fs.readFileSync('./ingredient-dataset.tsv', 'utf8').split('\n');
const ingredientEmbeddingsLines = fs.readFileSync('./emb/ingredient.emb', 'utf8').split('\n');

const ingredients = {}

for (let i = 1; i < ingredientDatasetLines.length; i++) {
  const [id, parentId, name] = ingredientDatasetLines[i].split('\t');
  ingredients[i] = { id, parentId, name };
}

for (let i = 1; i < ingredientEmbeddingsLines.length; i++) {
  const [id, ...embedding] = ingredientEmbeddingsLines[i].split(' ');
  ingredients[id] = { ...ingredients[id], embedding };
}

fs.writeFileSync('./embeddings.json', JSON.stringify(ingredients, null, 2));