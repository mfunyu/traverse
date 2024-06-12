NAME := traverse

all	: build run

.PHONY	: build
build	:
	docker build --no-cache -t $(NAME) .

.PHONY	: run
run		:
	docker run -d -p 3000:3000 --name $(NAME)_img $(NAME)

.PHONY	: stop
stop	:
	docker stop $(NAME)_img

.PHONY	: clean
clean	: stop
	docker rm $(NAME)_img

.PHONY	: help
help	:
	@echo "make build:\tBuild the docker image"
	@echo "make run:\tRun the docker image"
	@echo "make stop:\tStop the docker image"
	@echo "make clean:\tStop and remove the docker image"
	@echo "make help:\tDisplay this help message"
	@echo "\n[for development]"
	@echo "make setup:\tSetup the pre-commit hook"

# ------------------------------ for development ----------------------------- #

.PHONY	: setup
setup	:
	cp .gitlab/hooks/pre-commit .git/hooks/pre-commit