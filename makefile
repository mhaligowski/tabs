NPX=npx
CONFIG=./config/webpack.config.js
WEBPACK=$(NPX) webpack --config=$(CONFIG)

SRC=./src

serve: $(CONFIG)
	$(WEBPACK) $@

dist: $(CONFIG) $(SRC)
	$(WEBPACK)

clean:
	-rm -rf dist

.PHONY: clean dist
