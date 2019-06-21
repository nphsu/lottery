<template>
  <v-layout>
    <v-flex md12>
      <div class="text-xs-center">
        <p class="display-2">DREAM TICKETS</p>
        <p>You can buy a ticket per <span class="title font-weight-bold font-italic">{{ price }}</span> Ether</p>
        <v-text-field v-model="introducer" label="Please input your introducer (Not Required)"></v-text-field>
        <p>You can choose your favorite number below boxies.</p>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">0001 - 0500</v-btn>
          </template>
          <v-card>
            <v-card-title>Select Ticket Number</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-radio-group v-model="dialogm1" column>
                <div v-for="(value, index) in numbers1_500" :key="index">
                  <v-radio :label="value.num" :value="value.num" :disabled="value.soldout"></v-radio>
                </div>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" flat @click="dialog = false">CANCEL</v-btn>
              <v-btn color="blue darken-1" flat @click="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">0501 - 1000</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">1001 - 1500</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">1501 - 2000</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">2001 - 2500</v-btn>
          </template>
        </v-dialog>
        <v-divider/>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">2501 - 3000</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">3001 - 3500</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">3501 - 4000</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">4001 - 4500</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">4501 - 5000</v-btn>
          </template>
        </v-dialog>
        <v-divider/>
        <p>Your select number is  <span class="headline font-weight-bold font-italic">  {{totalEntryNumber}}  </span> Are you sure?</p>
        <v-btn @click="buy()">BUY TICKET</v-btn>
        <v-divider/>
        <v-divider/>
        <p>We have been accepted <span class="headline font-weight-bold font-italic">{{totalEntryNumber}}</span> entries until now!!</p>
        <p>And now, we have collected <span class="headline font-weight-bold font-italic">{{depositedAmount}}</span> Ether!!</p>
        <p>Let's try your destiny!</p>
        <v-btn @click="$router.push(`/`)">BACK TO TOP</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Web3 from 'web3'
import dreamTicketJSON from '~/contracts/DreamTicket.json'
const web3 = new Web3(Web3.givenProvider)
const dreamTicketABI = dreamTicketJSON.abi
const dreamTicketAddress = dreamTicketJSON.networks[5777].address
const dreamTicket = web3.eth.Contract(dreamTicketABI, dreamTicketAddress)
const playerAddress = window.web3.eth.accounts[0]

export default {
  components: {},
  data () {
    return {
      price: 0,
      totalEntryNumber: 0,
      depositedAmount: 0,
      judgeMessage: 'You can win',
      introducer: '',
      numbers1_500: [{num:1,soldout:false},{num:2,soldout:true},{num:3,soldout:false},{num:4,soldout:false}]
    }
  },
  // When we use `this` before function, we have to describe `async function ()` instead of `async () =>`
  created: async function () {
    await this.refresh()
    // await this.getIntroducer(3)
    this.depositedAmount = await this.getContractBalance()
    for (let i = 0; i < 50; i++) {
      const numbers = await this.getNumber(i)
      console.log(numbers)
      this.numbers1_500.push(numbers)
    }
    console.log(this.numbers1_500)
  },
  methods: {
    getPrice: function () {
      return this.price
    },
    buy: async function () {
      console.log(window.web3.eth.accounts)
      console.log(this.introducer)
      
      let encodedData
      if (this.introducer === '') {
        console.log('--')
        encodedData = dreamTicket.methods.buy().encodeABI()
      } else {
        console.log('++')
        encodedData = dreamTicket.methods.buyWithIntroducer(this.introducer).encodeABI()
      }
      const txCount = await this.getTxCount(playerAddress)
      const rowTx = this.makeRowTx(encodedData, txCount)

      // The MetaMask Web3 object does not support synchronous methods
      window.web3.eth.sendTransaction(rowTx, (e, id) => {
        if (e) {
          console.error(e)
          console.log(id)
        }
      })

      // Get Event to verify
      const eventBuy = await dreamTicket.events.Buy()
      console.log(eventBuy)
      dreamTicket.events.Buy().on('data', function (event) {
        const data = event.returnValues
        console.log(event)
        console.log(data[0])
        console.log(data[1])
        console.log(data[2])
        console.log(data[3])
      }).on('error', console.error)
      
    },
    getTxCount: async address => {
      const count = await web3.eth.getTransactionCount(address)
      return count
    },
    makeRowTx: (encodedData, txCount) => {
      const value = 0.001 * 1000000000000000000
      return {
        from: playerAddress,
        to: dreamTicketAddress,
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
    refresh: async function () {
      await this.getTicketPrice()
      await this.getTotalEntries()
      await this.getDepositedAmount()
    },
    getTicketPrice: async function () {
      const price = await dreamTicket.methods.getPrice().call()
      if (price === undefined || price ==='') {
        this.price = 0
      } else {
        this.price = price.toNumber() / 1e18
      }
    },
    totalQuantity: async function () {
      const quantity = await dreamTicket.methods.getTotalQuantity().call()
      console.log(quantity.toNumber() / 1e18)
      this.judgeMessage = 'You can get 3ST PRIZE(0.001ETH)'
      return quantity
    },
    getTotalEntries: async function () {
      const entries = await dreamTicket.methods.getEntries().call()
      this.totalEntryNumber = entries.length
      return entries
    },
    getDepositedAmount: async function () {
      // Why don't I get value
      // const amount = await dreamTicket.methods.getDepositedAmount().call()
      // if (amount === undefined || amount ==='') {
      //   this.depositedAmount = 0
      // } else {
      //   this.depositedAmount = amount.toNumber() / 1e18
      // }
    },
    // getIntroducer: async function (num) {
    //   const introducer = await dreamTicket.methods.getIntroducer(num).call()
    //   console.log(introducer)
    // }
    getContractBalance: async function () {
      const balance = await dreamTicket.methods.getBalance().call()
      console.log(balance.toNumber() / 1e18)
      return balance.toNumber() / 1e18
    },
    getNumber: async function(num) {
      const soldout = await dreamTicket.methods.getNunber(num).call()
      return {num: num, soldout: soldout}
    }
  }
}
</script>