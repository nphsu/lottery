#!/bin/zsh
rm -r ./build/contracts
mkdir ./build/contracts
npm run dev
cp -f ./build/contracts/* ../frontend/contracts