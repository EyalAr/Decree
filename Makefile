SRC_DIR=src
SRC_FILES=decree.js validators.js
DIST_DIR=dist
FUME=../node_modules/.bin/fume

install:
	npm install

dist_cjs:
	cd src && $(FUME) $(SRC_FILES) -cjsify -o ../$(DIST_DIR)/cjs && cd ..

dist_amd:
	cd src && $(FUME) $(SRC_FILES) -amdify -o ../$(DIST_DIR)/amd && cd ..

rm_dist:
	rm -rf $(DIST_DIR)

dist: rm_dist dist_amd dist_cjs

test: dist
	./node_modules/.bin/mocha --recursive --reporter spec tests

coverage: dist
	./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha -- --recursive --reporter spec tests

travis: install dist
	./node_modules/.bin/istanbul cover --report lcovonly ./node_modules/.bin/_mocha -- --recursive --reporter spec --bail tests && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
