run:
	make sass && npm run server

sass:
	npx sass themes/logos/source/styles/site.scss themes/logos/source/styles/site.css
