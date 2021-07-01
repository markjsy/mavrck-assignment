
## Instructions for local development
1) Install docker via https://docs.docker.com/get-docker/

2) Install following images:
docker pull postgres

3) Clone/Download this project

4) Navigate to /graphql-service folder and change the .env file's DATABASE_URL to:
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/mavrckdb?schema=mavrckdb"

5) Navigate into the root folder of the project

6) In your terminal run:

Linux (Ubuntu):
    npm run install-all
    ./deploy_local.bash

Mac:
    npm run install-all
    sudo ./deploy_local.bash


## Instructions for running production application

1) Install docker via https://docs.docker.com/get-docker/

2) Install following images:
docker pull rabbitmq
docker pull node
docker pull postgres

3) Clone/Download the project

4) Navigate to /graphql-service folder and change the .env file's DATABASE_URL to:
DATABASE_URL="postgresql://postgres:mysecretpassword@postgres:5432/mavrckdb?schema=mavrckdb"

5) Navigate into the root folder of the project

6) In your terminal run:

Linux (Ubuntu):
    sudo su
    ./deploy_prod.bash

Mac:
    sudo ./deploy_prod.bash

Note: deploy_prod.bash may take 10-15 min to fully deploy

## Links
UI
http://0.0.0.0:5000/

GraphQL
http://0.0.0.0:2500/graphql

RabbitMQ - Live view of queue
http://0.0.0.0:15672/
username = guest
password = guest


