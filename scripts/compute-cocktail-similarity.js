const fs = require('fs');
const path = require('path');
const similarity = require('compute-cosine-similarity');

const cocktailEmbeddings = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/cocktail-embeddings.json'), 'utf8')
);

const computeSimilarity = (cocktailIdA, cocktailIdB, doNotLog = false) => {
  const cocktailA = cocktailEmbeddings[cocktailIdA];
  const cocktailB = cocktailEmbeddings[cocktailIdB];
  const similarityResult = similarity(Object.values(cocktailA.recipes)[0], Object.values(cocktailB.recipes)[0]);

  !doNotLog &&
    console.log(`Similarity between ${cocktailA.cocktailName} and ${cocktailB.cocktailName}: ${similarityResult}`);

  return similarityResult;
};

const findMostSimilarCocktail = cocktailId => {
  const cocktailIds = Object.keys(cocktailEmbeddings).filter(id => id !== cocktailId);

  const similarities = cocktailIds
    .map(cocktailIdToCompare => [cocktailIdToCompare, computeSimilarity(cocktailId, cocktailIdToCompare, true)])
    .sort((a, b) => {
      return b[1] - a[1];
    });

  similarities.slice(0, 5).map(([cocktailIdToCompare, similarity], index) => {
    const cocktailA = cocktailEmbeddings[cocktailId];
    const cocktailB = cocktailEmbeddings[cocktailIdToCompare];

    console.log(
      `${index + 1}. Similarity between ${cocktailA.cocktailName} and ${cocktailB.cocktailName}: ${similarity}`
    );
  });

  console.log('\n');
};

// computeSimilarity('2eb700e3-fd1e-45c5-8333-8b6db9748310', '85d80043-365a-4602-8063-9df658f3fbb6');
// computeSimilarity('792e4ad1-7b07-4f51-b616-86170047a8df', '85d80043-365a-4602-8063-9df658f3fbb6');
// computeSimilarity('792e4ad1-7b07-4f51-b616-86170047a8df', '5fa9f5c2-766e-46bc-ac16-9e8bae3c4a46');
// computeSimilarity('2eb700e3-fd1e-45c5-8333-8b6db9748310', '875330c1-b2bf-4d8b-b597-b1d4c5ddf037');
// computeSimilarity('1b88e544-801c-4336-a3fa-be3ea289d5a4', '875330c1-b2bf-4d8b-b597-b1d4c5ddf037');
// computeSimilarity('1b88e544-801c-4336-a3fa-be3ea289d5a4', 'ef92f54d-ef15-4c40-8b80-937ab88d8e71');
// computeSimilarity('49f4cdec-4dfe-4c3b-a541-766db090257d', 'ef92f54d-ef15-4c40-8b80-937ab88d8e71');
// computeSimilarity('2eb700e3-fd1e-45c5-8333-8b6db9748310', 'bf872315-1893-44c3-997b-dc9383f251cf');

findMostSimilarCocktail('2eb700e3-fd1e-45c5-8333-8b6db9748310');
findMostSimilarCocktail('85d80043-365a-4602-8063-9df658f3fbb6');
findMostSimilarCocktail('792e4ad1-7b07-4f51-b616-86170047a8df');
findMostSimilarCocktail('5fa9f5c2-766e-46bc-ac16-9e8bae3c4a46');
findMostSimilarCocktail('875330c1-b2bf-4d8b-b597-b1d4c5ddf037');
findMostSimilarCocktail('1b88e544-801c-4336-a3fa-be3ea289d5a4');
findMostSimilarCocktail('ef92f54d-ef15-4c40-8b80-937ab88d8e71');
findMostSimilarCocktail('49f4cdec-4dfe-4c3b-a541-766db090257d');
findMostSimilarCocktail('bf872315-1893-44c3-997b-dc9383f251cf');
