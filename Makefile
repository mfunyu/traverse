NAME := traverse

all	: build run

.PHONY	: build
build	:
	docker build --no-cache -t $(NAME) .

.PHONY	: run
run		:
	docker run -p 3000:3000 --name $(NAME)_img $(NAME)

.PHONY	: setup
setup	:
	cp .gitlab/hooks/pre-commit .git/hooks/pre-commit