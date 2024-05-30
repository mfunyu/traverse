all	:
	docker build -t road-trip-app .

setup	:
	cp .github/hooks/pre-commit .git/hooks/pre-commit