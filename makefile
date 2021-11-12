NPX=npx
CONFIG=./config/webpack.config.js
WEBPACK=$(NPX) webpack
SRC=./src

FB=firebase

serve: $(CONFIG)
	$(WEBPACK) $@ --config=$<

dist: $(CONFIG) $(SRC)
	$(WEBPACK) --config=$<

clean:
	-rm -rf dist

deploy: dist
	$(FB) $@

.PHONY: clean dist deploy
