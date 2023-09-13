#!/bin/bash

# Install dependencies of the API
npm install

# Install dependencies of the client
cd client
npm install

# start the server
cd ..
npm run dev
