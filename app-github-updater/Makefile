#
# Simple interface to run Docker!
#


# Running container's name
organization?=$(shell node -p "require('./package.json').organization")
name:=$(shell node -p "require('./package.json').name")
version:= $(shell node -p "require('./package.json').version")

# Docker image tag name
tag?=${organization}/${name}

# Mish
loglevel?=debug
email?=marco.pegoraro@gmail.com
username?=marcopeg
password?=xxx
repository?=marcopeg/feedlify-demo
interval?=5000

# Build the project using cache
image:
	docker build -t ${tag} -t ${tag}:${version} .
	
# Spins up a container from the latest available image
# this is useful to test locally
run:
	docker run \
		--rm \
		--name ${name} \
		-e LOG_LEVEL=${loglevel} \
		-e GITHUB_EMAIL=${email} \
		-e GITHUB_USERNAME=${username} \
		-e GITHUB_PASSWORD=${password} \
		-e GITHUB_REPOSITORY=${repository} \
		-e INTERVAL=${interval} \
		-v /tmp/feedlify/data:/var/lib/feedlify \
		${tag}

stop:
	docker stop ${name}

remove:
	docker rm ${name}

publish:
	docker tag ${tag}:${version} ${tag}:${version}
	docker tag ${tag}:${version} ${tag}:latest
	docker push ${tag}:${version}
	docker push ${tag}:latest

release: image publish
