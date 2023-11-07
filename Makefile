.PHONY: prepare
prepare:
	rm -rf build/temp
	rm -rf build/artefacts
	mkdir -p build/temp
	mkdir -p build/artefacts
	cp -r src/* build/temp

build: prepare
	cd build/temp && zip -rv kudoall.zip .
	zip -T build/temp/kudoall.zip
	cp build/temp/kudoall.zip build/artefacts/kudoall-chrome.zip
	cp build/temp/kudoall.zip build/artefacts/kudoall-firefox.zip
