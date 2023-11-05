const fs = require('fs');
const path = require('path');

const ingredientDatasetLinesRaw = fs
  .readFileSync(path.resolve(__dirname, '../data/ingredient-dataset.tsv'), 'utf8')
  .split('\n');

const [, ...ingredientDatasetLines] = ingredientDatasetLinesRaw;

const ingredientIds = ingredientDatasetLines.map(line => line.split('\t')[0]);

const ingredientEdgeListLines = ingredientDatasetLines
  .filter(line => !!line)
  .map(line => {
    const [id, parentId] = line.split('\t');

    const idIndex = ingredientIds.indexOf(id) + 1;
    const parentIdIndex = ingredientIds.indexOf(parentId) + 1;

    return `${idIndex} ${parentIdIndex === 0 ? '#N/A' : parentIdIndex}`;
  });

fs.writeFileSync(path.join(__dirname, '../graph/ingredient.edgelist'), ingredientEdgeListLines.join('\n'));
