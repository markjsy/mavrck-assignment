## Demo hosted on
http://35.184.121.149:3000/

## Instructions for local development (Linux Only)

1) Install docker via https://docs.docker.com/get-docker/

2) Install following images:
    * docker pull postgres
    * docker pull node
    * docker pull rabbitmq

3) Clone/Download this project

4) Navigate to /graphql-service folder and change the .env file's DATABASE_URL to:
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/mavrckdb?schema=mavrckdb"

5) Navigate into the root folder of the project

6) In your terminal run:
    * npm install
    * npm run install-all
    * ./deploy_local.bash


## Links
UI
http://localhost:3000/

GraphQL
http://localhost:2500/graphql



