Docker Personal Updater for @feedlify
=====================================

Docker Vacuum is a utility container that will help keep a clean Docker in your
production server or development machine.

Docker Vacuums prunes your system and programmatically deletes images that are not
in use, with a retention policy based on the tags.

    docker run \
		--rm \
		--name feedlify-personal-updater \
		-e EMAIL="username@gmail.com" \
		-e USERNAME="username" \
		-e PASSWORD="your-token" \
		-e REPOSITORY="repo" \
		feedlify-personal-updater:latest

