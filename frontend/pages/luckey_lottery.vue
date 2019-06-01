<template>
  <v-layout>
    <v-flex>
      <div class="text-xs-center">
        <p>Luckey Lottery</p>
        <p>You can buy a ticket per <span>{{ price }}</span> Ether</p>
        <v-btn @click="buy()">BUY TICKET</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Web3 from 'web3'
import Tx from 'ethereumjs-tx'
import luckeyLotteryJSON from '~/contracts/LuckeyLottery.json'
const web3 = new Web3(window.web3.currentProvider)
const luckeyLotteryABI = luckeyLotteryJSON.abi
const luckeyLotteryAddress = luckeyLotteryJSON.networks[5777].address
const luckeyLottery = web3.eth.Contract(luckeyLotteryABI, luckeyLotteryAddress)
const ownerPrivKey = process.env.OWNER_PRIV_KEY
console.log(ownerPrivKey) // Why don't I get this..
// const playerAddress = web3.eth.accounts[0] // Why don't I get this..
const playerAddress = '0xC2B9Da58dF9Be7307781e8C363Ec96958e8943D5' // will remove

export default {
  components: {},
  data () {
    return {
      price: 0,
    }
  },
  created: async function () {
    const price = await luckeyLottery.methods.getPrice().call()
    const priceEther = price.toNumber() / 1e18
    this.price = priceEther;
  },
  methods: {
    getPrice: function () {
      return this.price
    },
    buy: async function () {
      const encodedData = luckeyLottery.methods.buy().encodeABI()
      const txCount = await this.getTxCount(playerAddress)
      const rowTx = this.makeRowTx(encodedData, txCount)
      console.log(rowTx)
      const signedTx = this.signTx(rowTx)
      console.log(signedTx)
      await this.sendTx(signedTx)
      console.log('buy')
    },
    getTxCount: async address => {
      const count = await web3.eth.getTransactionCount(address)
      return count
    },
    makeRowTx: (encodedData, txCount) => {
      return {
        from: playerAddress,
        to: luckeyLotteryAddress,
        gasPrice: web3.utils.toHex(3 * 1e10),
        gasLimit: web3.utils.toHex(5000000),
        nonce: '0x' + txCount.toString(16),
        value: '0x0',
        data: encodedData,
        chainId: 42 // Why 42
      }
    },
    signTx: rowTx => {
      const privKey = Buffer.from(ownerPrivKey, 'hex')
      const tx = new Tx(rowTx)
      tx.sign(privKey)
      return tx
    },
    sendTx: async tx => {
      const serializedTx = tx.serialize()
      await web3.eth
      .sendSignedTransaction('0x' + serializedTx.toString('hex'))
      .on('receipt', console.log)
    }
  }
}
</script>