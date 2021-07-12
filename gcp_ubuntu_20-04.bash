
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
sudo rm -rf mavrck-assignment
sudo git clone https://github.com/markjsy/mavrck-assignment.git

# Install apache2
sudo apt-get update && sudo apt-get install apache2 -y
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
sudo a2enmod rewrite
sudo apache2ctl restart

# Puppeteer
sudo apt-get -y install libnss3-dev 
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
sudo apt-get install -y libgbm-dev

# Change directory to project
cd /mavrck-assignment

sudo npm install
sudo npm run install-all
sudo ./deploy_prod.bash
