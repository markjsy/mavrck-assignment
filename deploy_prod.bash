#!/bin/bash
docker swarm init || true
docker stack rm mavrck || true
cd insta-puppet-service
docker build -t insta-puppet-service .
cd ../insta-puppet-consumer
docker build -t insta-puppet-consumer .
cd ../react-redux-ui
docker build -t react-redux-ui .  
cd ../graphql-service
docker build -t graphql-service .
cd ..
docker stack deploy --compose-file docker-compose.yaml mavrck
