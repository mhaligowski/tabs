NPX=npx
WEBPACK=$(NPX) webpack

serve: ./config/webpack.config.js
	$(WEBPACK) serve --config=$<