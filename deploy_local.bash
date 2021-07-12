#!/bin/bash

# Installing node_module all projects
sudo npm install
sudo npm run install-all

# Killing all relevant ports/processes needed to run
sudo docker stop $(docker ps -a -q) &&
sudo docker rm $(docker ps -a -q) &&
sudo docker volume rm $(docker volume ls -qf dangling=true) &&
sudo docker network disconnect -f mavrck mavrckdb || true &&
sudo docker network disconnect -f mavrck rabbitmq || true &&
sudo service docker restart &&
sudo -u rabbitmq rabbitmqctl stop || true

# Killing all processes of any needed ports to run locally
sudo killall -u rabbitmq || true
sudo kill $(sudo lsof -t -i:5432) || true 
sudo kill $(sudo lsof -t -i:8080) || true 
sudo kill $(sudo lsof -t -i:2000) || true 
sudo kill $(sudo lsof -t -i:2500) || true 
sudo kill $(sudo lsof -t -i:3000) || true 
sudo kill $(sudo lsof -t -i:4000) || true
sudo kill $(sudo lsof -t -i:5000) || true 
sudo kill $(sudo lsof -t -i:6000) || true 
sudo kill $(sudo lsof -t -i:7000) || true 

# Removing any previous instances of the network docker network or containers
docker network rm mavrck || true
docker network create mavrck || true
docker stop mavrckdb || true 
docker rm mavrckdb  || true 
docker stop rabbitmq || true

# Starting up new docker containers
docker run --name mavrckdb --network mavrck -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres 
docker run -d --hostname rabbitmq --network mavrck --name rabbitmq -p 15672:15672 -p 5950:5950 -p 5672:5672 rabbitmq

# Waiting for db and queue to fully start
DOCKER_DB="mavrckdb" 
timeout 300s bash -c "until docker exec $DOCKER_DB pg_isready ; do sleep 5 ; done"

DOCKER_QUEUE="rabbitmq" 
timeout 300s bash -c "until docker exec $DOCKER_QUEUE rabbitmq-diagnostics check_running ; do sleep 5 ; done"

# Performing prisma migration
cd graphql-service &&
sudo npx prisma migrate dev &&
sudo npx prisma db seed --preview-feature &&
cd .. &&

sudo npm run start-all-local 
