#!/bin/bash

# Creating ingress just in case it was deleted
docker network create --ingress --driver overlay ingress || true

# Init swarm if not done already
docker swarm init || true

# Removing any instances of previous deployment
docker stack rm mavrck || true

# Building all images
cd insta-puppet-service
docker build -t insta-puppet-service .
cd ../insta-puppet-consumer
docker build -t insta-puppet-consumer .
cd ../react-redux-ui
docker build -t react-redux-ui .  
cd ../graphql-service
docker build -t graphql-service .
cd ..

# Deploying images
docker stack deploy --compose-file docker-compose.yaml mavrck
