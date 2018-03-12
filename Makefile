install:
	npm install

gendiff:
	npm run babel-node -- src/bin/gendiff.js

build:
	rm -rf dist
	npm run build

publish:
	npm publish

lint:
	npm run eslint
