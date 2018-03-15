install:
	npm install

build:
	rm -rf dist
	npm run build

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm run test

ast-test:
	npm run ast-test

gendiff:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/json_tests/all_before.json __tests__/__fixtures__/json_tests/all_after.json
