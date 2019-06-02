<template>
  <v-layout>
    <v-flex md12>
      <div class="text-xs-center">
        <p>Luckey Lottery</p>
        <p>You can buy a ticket per <span>{{ price }}</span> Ether</p>
        <v-btn @click="buy()">BUY TICKET</v-btn>
        <v-btn @click="totalQuantity()">TOTAL QUANTITY</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Web3 from 'web3'
import luckeyLotteryJSON from '~/contracts/LuckeyLottery.json'
const web3 = new Web3(Web3.givenProvider)
const luckeyLotteryABI = luckeyLotteryJSON.abi
const luckeyLotteryAddress = luckeyLotteryJSON.networks[5777].address
const luckeyLottery = web3.eth.Contract(luckeyLotteryABI, luckeyLotteryAddress)
const playerAddress = window.web3.eth.accounts[0]

export default {
  components: {},
  data () {
    return {
      price: 0,
    }
  },
  created: async function () {
    const price = await luckeyLottery.methods.getPrice().call()
    if (price === undefined || price ==='') {
      this.price = 0
    }
    this.price = price.toNumber() / 1e18
  },
  methods: {
    getPrice: function () {
      return this.price
    },
    buy: async function () {
      console.log(window.web3.eth.accounts)
      const encodedData = luckeyLottery.methods.buy().encodeABI()
      const txCount = await this.getTxCount(playerAddress)
      const rowTx = this.makeRowTx(encodedData, txCount)
      console.log(rowTx)
      window.web3.eth.sendTransaction(rowTx, (e, id) => {
        console.log(e)
        console.log(id)
      })
      console.log('buy')
      luckeyLottery.events.Buy().on('data', function (event) {
        const data = event.returnValues;
        console.log('Get event');
        console.log(data);
      })
      .on("error", console.error);
    },
    getTxCount: async address => {
      const count = await web3.eth.getTransactionCount(address)
      return count
    },
    makeRowTx: (encodedData, txCount) => {
      const value = 0.001 * 1000000000000000000
      return {
        from: playerAddress,
        to: luckeyLotteryAddress,
        gasPrice: web3.utils.toHex(3 * 1e10),
        gasLimit: web3.utils.toHex(5000000),
        nonce: '0x' + txCount.toString(16),
        value: value,
        data: encodedData,
        chainId: 42 // Why 42
      }
    },
    // signTx: rowTx => {
    //   const privKey = Buffer.from(ownerPrivKey, 'hex')
    //   const tx = new Tx(rowTx)
    //   tx.sign(privKey)
    //   return tx
    // },
    // sendTx: async tx => {
    //   const serializedTx = tx.serialize()
    //   await web3.eth
    //   .sendSignedTransaction('0x' + serializedTx.toString('hex'))
    //   .on('receipt', console.log)
    // }
    totalQuantity: async () => {
      const quantity = await luckeyLottery.methods.getTotalQuantity().call()
      console.log(quantity.toNumber() / 1e18)
      return quantity
    }
  }
}
</script>