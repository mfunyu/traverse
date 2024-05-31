NAME := traverse

all	: build run

.PHONY	: build
build	:
	docker build -t $(NAME) .

.PHONY	: run
run		:
	docker run -p 3001:3000 --name $(NAME)_img $(NAME)

.PHONY	: setup
setup	:
	cp .github/hooks/pre-commit .git/hooks/pre-commit