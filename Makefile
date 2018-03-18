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

test-coverage:
	npm run test-coverage

watch-test:
	npm run watch-test

gendiff-raw:
	npm run babel-node -- src/bin/gendiff.js __tests__/__fixtures__/json_tests/hexletNested_before.json __tests__/__fixtures__/json_tests/hexletNested_after.json

gendiff-plain:
	npm run babel-node -- src/bin/gendiff.js --format plain __tests__/__fixtures__/json_tests/hexletNested_before.json __tests__/__fixtures__/json_tests/hexletNested_after.json

gendiff-json:
	npm run babel-node -- src/bin/gendiff.js --format json __tests__/__fixtures__/json_tests/hexletNested_before.json __tests__/__fixtures__/json_tests/hexletNested_after.json

gendiff-wrong:
	npm run babel-node -- src/bin/gendiff.js --format wrong __tests__/__fixtures__/json_tests/hexletNested_before.json __tests__/__fixtures__/json_tests/hexletNested_after.json

gendiff-h:
	npm run babel-node -- src/bin/gendiff.js -h
