NPX=npx
CONFIG=./config/webpack.config.js
WEBPACK=$(NPX) webpack --config=$(CONFIG)
SRC=./src

FB=firebase

serve: $(CONFIG)
	$(WEBPACK) $@

dist: $(CONFIG) $(SRC)
	$(WEBPACK)

clean:
	-rm -rf dist

deploy: dist
	$(FB) $@

.PHONY: clean dist deploy
