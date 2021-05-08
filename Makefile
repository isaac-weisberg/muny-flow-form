
default: app open

open:
	open ./dist/index.html

app:
	npx webpack --config ./dev.webpack.js

watch:
	npx webpack serve --config ./dev.webpack.js