#!/bin/bash

# Killing all relevant ports needed to run
kill $(sudo lsof -t -i:5432) || true 
kill $(sudo lsof -t -i:5672) || true 
kill $(sudo lsof -t -i:2000) || true 
kill $(sudo lsof -t -i:2500) || true 
kill $(sudo lsof -t -i:3000) || true 
kill $(sudo lsof -t -i:4000) || true
kill $(sudo lsof -t -i:5000) || true 
kill $(sudo lsof -t -i:6000) || true 
kill $(sudo lsof -t -i:7000) || true 

# Removing any instances of the network or containers
docker network create mavrck || true
docker stop mavrckdb || true 
docker rm mavrckdb  || true 
docker stop rabbitmq || true
docker rm rabbitmq || true  

# Starting new containers
docker run --name mavrckdb --network mavrck -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres 
docker run -d --hostname rabbitmq --network mavrck --name rabbitmq  -p 8080:15672 -p 5672:5672 rabbitmq:3-management


# Waiting for db and queue to fully start
DOCKER_DB="mavrckdb" 
timeout 90s bash -c "until docker exec $DOCKER_DB pg_isready ; do sleep 5 ; done"

DOCKER_QUEUE="rabbitmq" 
timeout 90s bash -c "until docker exec $DOCKER_QUEUE rabbitmq-diagnostics check_running ; do sleep 5 ; done"

# Performing prisma migration
cd graphql-service &&
npx prisma migrate dev &&
npx prisma db seed --preview-feature &&
cd ..

# Starting all projects
npm run start-all 
