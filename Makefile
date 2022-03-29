install: # установить зависимости
	npm ci

gendiff: # запуск gendiff.js
	node bin/gendiff.js

publish: # учебная публикация пакета
	sudo npm publish --dry-run

test:
	npm test

lint: # запустить линтер
	npx eslint .