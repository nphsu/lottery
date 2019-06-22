<template>
  <v-layout>
    <v-flex md12>
      <div class="text-xs-center">
        <p class="display-2">DREAM TICKETS</p>
        <p>Now is available (1.Aug.2019 - 14.Aug.2019)</p>
        <p>You can buy a ticket per <span class="title font-weight-bold font-italic">{{ ticketPrice }}</span> Ether</p>
        <v-text-field v-model="introducer" label="Please input your introducer (Not Required)"></v-text-field>
        <p>You can choose your favorite number below boxies.</p>
        
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" @click="getSelectableNumbers(0, 4)">0000 - 0499</v-btn>
          </template>
          <v-card>
            <v-card-title>Select Ticket Number</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 500px; width: 500px;">
              <v-radio-group column>
                <div v-for="(value, index) in numbers1_500" :key="index">
                  <v-btn :disabled="value.soldout" @click="selectNumber(value.num)">{{value.num}}</v-btn>
                </div>
              </v-radio-group>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" disabled>0500 - 0999</v-btn>
          </template>
        </v-dialog>

        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" disabled>1500 - 1999</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" disabled>2000 - 2499</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" disabled>2500 - 2999</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" disabled>3000 - 3499</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" disabled>3500 - 3999</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" disabled>4000 - 4499</v-btn>
          </template>
        </v-dialog>
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on" disabled>4500 - 4999</v-btn>
          </template>
        </v-dialog>

        <p>Your select number is  <span class="headline font-weight-bold font-italic">  {{selectedNumber}}  </span> Are you sure?</p>
        <v-layout row>
          <v-flex md6>
            <v-text-field class="mr-2" v-model="passcode" label="Passcode"></v-text-field>
          </v-flex>
          <v-flex md6>
            <v-text-field v-model="passcodeConfirm" label="Passcode(Confirm)"></v-text-field>
          </v-flex>
        </v-layout>
        <v-alert :value="!validPasscode" color="error" icon="warning" outline>
          PASSCODE is not confirmed.
        </v-alert>
        <v-alert :value="buyComplete" color="success" icon="success" transition="scale-transition" outline>
          BUY process finished. You have to do REVEAL during reveal turm.
        </v-alert>
        <v-layout>   
          <v-flex md12>
            <v-btn @click="buy()">BUY TICKET</v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex md12>
            <v-btn @click="$router.push(`/`)">BACK TO TOP</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Web3 from 'web3'
import dreamTicketJSON from '~/contracts/DreamTicket.json'
// import dreamticketsVue from '../dreamtickets.vue';
const web3 = new Web3(Web3.givenProvider)
const dreamTicketABI = dreamTicketJSON.abi
const dreamTicketAddress = dreamTicketJSON.networks[5777].address
const dreamTicket = web3.eth.Contract(dreamTicketABI, dreamTicketAddress)
const playerAddress = window.web3.eth.accounts[0]

export default {
  components: {},
  data () {
    return {
      ticketPrice: 0,
      selectedNumber: 0,
      introducer: '',
      passcode: '',
      passcodeConfirm: '',
      validPasscode: true,
      dialog: false,
      buyComplete: false,
      // numbers1_500: [{num:1,soldout:false},{num:2,soldout:true},{num:3,soldout:false},{num:4,soldout:false}],
      numbers1_500: '',
    }
  },
  created: async function () {
    await this.refresh()
  },
  methods: {
    refresh: async function () {
      await this.fetchTicketPrice()
    },
    fetchTicketPrice: async function () {
      const ticketPrice = await dreamTicket.methods.getPrice().call()
      if (ticketPrice === undefined || ticketPrice ==='') {
        this.ticketPrice = 0
      } else {
        this.ticketPrice = ticketPrice.toNumber() / 1e18
      }
    },
    getSelectableNumbers: async function (from, to) {
      // const targets = [...Array(to+1).keys()].slice(from, to+1)
      const numbers = await dreamTicket.methods.getSelectableNumbers(from, to).call()
      const result = [];
      for (const number of numbers) {
        const obj = {num: number.toNumber(), soldout: false}
        result.push(obj)
      }
      const outnumbers = await dreamTicket.methods.getNonSelectableNumbers(from, to).call()
      for (const outnumber of outnumbers) {
        const obj = {num: outnumber.toNumber(), soldout: true}
        result.push(obj)
      }
      this.numbers1_500 = result  
      return result
    },
    selectNumber: function (num) {
      this.selectedNumber = num
      this.dialog = false
    },
    buy: async function () {
      const _this = this
      const valid = this.validatePasscode()
      if (!valid) {
        return
      }
      let encodedData
      if (this.introducer === '') {
        console.log('call buy()')
        encodedData = dreamTicket.methods.buy(this.selectedNumber, this.passcode).encodeABI()
      } else {
        console.log('call buyWithIntroducer()')
        encodedData = dreamTicket.methods.buyWithIntroducer(this.selectedNumber, this.passcode, this.introducer).encodeABI()
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

      dreamTicket.events.Buy().on('data', function (event) {
        _this.buyComplete = true
      }).on('error', console.error)
    },
    validatePasscode: function () {
      if (this.passcode !== this.passcodeConfirm) {
        this.validPasscode = false
        return false
      }
      if (this.passcode.length !== 4) {
        return false
      }
      return true
      // TODO: Number check
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
  }
}
</script>