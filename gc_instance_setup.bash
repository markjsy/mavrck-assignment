#!/bin/bash
# Updating apt-get
sudo apt-get update
sudo apt-get upgrade

# Node
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt install -y nodejs
node -v

# Git
sudo apt-get install git 

# Docker
sudo apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get -y update
sudo apt-get -y install docker-ce docker-ce-cli containerd.io

# Docker Images for Project
sudo docker pull postgres
sudo docker pull node
sudo docker pull rabbitmq

# Screen
sudo apt-get install screen

# Clone Project
git clone https://github.com/markjsy/mavrck-assignment.git


# Change directory to project
cd mavrck-assignment

npm install
npm run install-all
sudo ./deploy_local.bash
