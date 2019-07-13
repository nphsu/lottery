# Lottery Game
A fantastic lottery using a Blockchain.

# Preparation
You should install a MetaMask and a Ganache to use this app. (It will be unnecessary to prepare a Ganache to use this app in the future. It has only local mode now.)

[MetaMask](https://metamask.io/)

[Ganache](https://www.trufflesuite.com/ganache)

And also, you must set up a NPM to launch this frontend application.

[NPM](https://www.npmjs.com/)


# About Source Code
There are two directories in this repository.

### frontend
This is a directory that contains source codes of a front end application, which is written in JavaScript/Vue.js. If you want to try to move this frontend, you can execute this command.

```
$ npm run dev
```

### dapp
This is a directory that contains source codes of a decentralized application, which is written in Solidity/Truffle. In many case, you do not neet to read this source code.


## For Developers
If you want to deploy smart contract modules, you can use this shell like this. In this shell, a program will delete some old files and replace new things. In most case, you do not need to execute this command.

```
$ sh dapp/deploy.sh
```
