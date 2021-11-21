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

test:
	$(NPX) jest

.PHONY: clean dist deploy test serve
