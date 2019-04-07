
clean-lock:
	(cd ./source-instagram && rm -f package-lock.json)
	(cd ./source-instagram && rm -f yarn.lock)
	(cd ./source-instagram && rm -f yarn-error.log)
	(cd ./source-twitter && rm -f package-lock.json)
	(cd ./source-twitter && rm -f yarn.lock)
	(cd ./source-twitter && rm -f yarn-error.log)
	(cd ./target-fs && rm -f package-lock.json)
	(cd ./target-fs && rm -f yarn.lock)
	(cd ./target-fs && rm -f yarn-error.log)
	(cd ./target-git && rm -f package-lock.json)
	(cd ./target-git && rm -f yarn.lock)
	(cd ./target-git && rm -f yarn-error.log)
	(cd ./feed-aggregator && rm -f package-lock.json)
	(cd ./feed-aggregator && rm -f yarn.lock)
	(cd ./feed-aggregator && rm -f yarn-error.log)
	(cd ./git && rm -f package-lock.json)
	(cd ./git && rm -f yarn.lock)
	(cd ./git && rm -f yarn-error.log)

clean:
	(cd ./source-instagram && rm -rf node_modules)
	(cd ./source-twitter && rm -rf node_modules)
	(cd ./target-fs && rm -rf node_modules)
	(cd ./target-git && rm -rf node_modules)
	(cd ./feed-aggregator && rm -rf node_modules)
	(cd ./git && rm -rf node_modules)

install:
	(cd ./source-instagram && yarn install)
	(cd ./source-twitter && yarn install)
	(cd ./target-fs && yarn install)
	(cd ./target-git && yarn install)
	(cd ./feed-aggregator && yarn install)
	(cd ./git && yarn install)

build:
	(cd ./source-instagram && yarn build)
	(cd ./source-twitter && yarn build)
	(cd ./target-fs && yarn build)
	(cd ./target-git && yarn build)
	(cd ./feed-aggregator && yarn build)
	(cd ./git && yarn build)

link: clean-lock
	(cd ./git && npm link .)
	(cd ./source-instagram && npm link .)
	(cd ./source-twitter && npm link .)
	(cd ./feed-aggregator && npm link @feedlify/source-instagram)
	(cd ./feed-aggregator && npm link @feedlify/source-twitter)
	(cd ./feed-aggregator && pwd && npm link .)
	(cd ./target-fs && npm link @feedlify/feed-aggregator)
	(cd ./target-fs && npm link .)
	(cd ./target-git && npm link @feedlify/target-fs)
	(cd ./target-git && npm link @feedlify/git)
	(cd ./target-git && npm link .)

init: install build link
reset: clean init
