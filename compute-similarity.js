const fs = require('fs');
const similarity = require('compute-cosine-similarity');

const ingredients = JSON.parse(fs.readFileSync('./embeddings.json', 'utf8'));

const computeSimilarity = (indexA, indexB) => {
  const ingredientA = ingredients[indexA];
  const ingredientB = ingredients[indexB];
  const similarityResult = similarity(ingredientA.embedding, ingredientB.embedding)

  console.log(`Similarity between ${ingredientA.name} and ${ingredientB.name}: ${similarityResult}`)
};

computeSimilarity(2, 12);
computeSimilarity(2, 35);
computeSimilarity(2, 167);
computeSimilarity(166, 167);
computeSimilarity(147, 12);
computeSimilarity(147, 380);