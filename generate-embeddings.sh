#! /bin/bash

node ./scripts/generate-ingredient-dataset.js
node ./scripts/generate-cocktail-recipe-dataset.js
node ./scripts/generate-ingredient-edge-list.js

python ./src/main.py --dimensions 32

node ./scripts/parse-embeddings.js
node ./scripts/parse-cocktail-recipes.js
node ./scripts/generate-cocktail-embeddings.js

node ./scripts/reset-ingredient-embeddings.js
node ./scripts/reset-cocktail-recipe-embeddings.js

node ./scripts/insert-ingredient-embeddings.js
node ./scripts/insert-cocktail-recipe-embeddings.js
