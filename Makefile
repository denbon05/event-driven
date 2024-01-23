setup:
	cd ansible && ansible-playbook setup-dev.yml -v

start:
	docker compose up
