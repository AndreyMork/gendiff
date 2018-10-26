gendiff-raw:
	npx babel-node -- src/bin/gendiff.js __tests__/__fixtures__/json_tests/hexletNested_before.json __tests__/__fixtures__/json_tests/hexletNested_after.json

gendiff-plain:
	npx babel-node -- src/bin/gendiff.js --format plain __tests__/__fixtures__/json_tests/hexletNested_before.json __tests__/__fixtures__/json_tests/hexletNested_after.json

gendiff-json:
	npx babel-node -- src/bin/gendiff.js --format json __tests__/__fixtures__/json_tests/hexletNested_before.json __tests__/__fixtures__/json_tests/hexletNested_after.json

gendiff-wrong:
	npx babel-node -- src/bin/gendiff.js --format wrong __tests__/__fixtures__/json_tests/hexletNested_before.json __tests__/__fixtures__/json_tests/hexletNested_after.json

gendiff-h:
	npx babel-node -- src/bin/gendiff.js -h


install:
	npm install

build:
	rm -rf dist
	npm run build

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

watch-test:
	npm test -- --watch
