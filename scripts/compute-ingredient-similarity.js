const fs = require('fs');
const path = require('path');
const similarity = require('compute-cosine-similarity');

const ingredients = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/ingredient-embeddings.json'), 'utf8'));

const computeSimilarity = (indexA, indexB) => {
  const ingredientA = ingredients[indexA];
  const ingredientB = ingredients[indexB];
  const similarityResult = similarity(ingredientA.embedding, ingredientB.embedding);

  console.log(`Similarity between ${ingredientA.name} and ${ingredientB.name}: ${similarityResult}`);
};

computeSimilarity('00a9afc9-6ffc-4c69-b703-a8f0d1522b7c', '04172f8a-6b70-4ec3-8dbb-90fe842833ad');
computeSimilarity('00a9afc9-6ffc-4c69-b703-a8f0d1522b7c', '0ce6c0f7-97e8-4706-b8c4-29b35448e0b8');
computeSimilarity('00a9afc9-6ffc-4c69-b703-a8f0d1522b7c', '3e76b4f5-4c46-4a72-85e4-f607b3fe3204');
computeSimilarity('3e3bd2c1-3554-4419-a66a-fcef059af75a', '3e76b4f5-4c46-4a72-85e4-f607b3fe3204');
computeSimilarity('39006563-374a-4552-81dc-5681f36910b9', '04172f8a-6b70-4ec3-8dbb-90fe842833ad');
computeSimilarity('39006563-374a-4552-81dc-5681f36910b9', '9821d3ab-1a53-4873-baf0-d4d255408ffc');
