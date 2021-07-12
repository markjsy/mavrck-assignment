#!/bin/bash
sudo rm -rf node_modules package-lock.json
for dir in */; do
 echo $dir;
 cd $dir;
 sudo rm -rf node_modules package-lock.json build
 cd ..
done