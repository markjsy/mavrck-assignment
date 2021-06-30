## Instructions

1) Install docker via https://docs.docker.com/get-docker/

2) Install following images:
docker pull rabbitmq
docker pull node
docker pull postgres

3) Clone/Download the project

4) Navigate into the root folder of the project

5) In your terminal run:

Linux (Ubuntu):
sudo su
./deploy_prod.bash

Mac:
sudo ./deploy_prod.bash

Note:
deploy_prod.bash may take 10-15min to fully deploy

## Links
UI
http://0.0.0.0:5000/

GraphQL
http://0.0.0.0:1000/graphql

RabbitMQ - Live view of queue
http://0.0.0.0:15672/
username = guest
password = guest


