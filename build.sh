#!/bin/bash

#pull latest
git pull origin main

#install new deps
npm install

#build the repo
npm run build

#restart pm2 process
pm2 restart mart

# To start for the first time
# pm2 start --name=mart npm -- start
