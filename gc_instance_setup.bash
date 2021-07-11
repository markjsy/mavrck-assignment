#!/bin/bash
# Updating apt-get
sudo apt-get -y update
sudo apt-get -y upgrade

# Node
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt install -y nodejs

# Git
sudo apt-get -y install git 

# Docker
sudo apt-get -y update
sudo apt install -y docker.io

# Docker Images for Project
sudo docker pull postgres
sudo docker pull node
sudo docker pull rabbitmq

# Screen
sudo apt-get install screen

# Clone Project
git clone https://github.com/markjsy/mavrck-assignment.git

# Install apache2
sudo apt-get update && sudo apt-get install apache2 -y
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
sudo a2enmod rewrite
sudo apache2ctl restart

# Change directory to project
cd mavrck-assignment


npm install
npm run install-all
sudo ./deploy.bash
