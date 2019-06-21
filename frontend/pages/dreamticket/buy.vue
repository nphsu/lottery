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
            <v-btn color="primary" dark v-on="on" @click="getSelectableNumbers(0, 4)">0001 - 0500</v-btn>
          </template>
          <v-card>
            <v-card-title>Select Ticket Number</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 500px; width: 500px;">
              <v-radio-group v-model="dialogm1" column>
                <div v-for="(value, index) in numbers1_500" :key="index">
                  <v-btn :disabled="value.soldout" @click="selectNumber(value.num)">{{value.num}}</v-btn>
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
          <v-card>
            <v-card-title>Select Ticket Number</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-radio-group v-model="dialogm1" column>
                <div v-for="(value, index) in numbers501_1000" :key="index">
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

        <p>Your select number is  <span class="headline font-weight-bold font-italic">  {{selectedNumber}}  </span> Are you sure?</p>
        <v-text-field v-model="passcode" label="Passcode"></v-text-field>
        <v-text-field v-model="passcodeConfirm" label="Passcode(Confirm)"></v-text-field>
        <v-btn @click="buy()">BUY TICKET</v-btn>

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
// const playerAddress = window.web3.eth.accounts[0]

export default {
  components: {},
  data () {
    return {
      ticketPrice: 0,
      selectedNumber: 0,
      introducer: '',
      passcode: '',
      passcodeConfirm: '',
      numbers1_500: [{num:1,soldout:false},{num:2,soldout:true},{num:3,soldout:false},{num:4,soldout:false}],

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
      const targets = [...Array(to+1).keys()].slice(from, to+1)
      const numbers = await dreamTicket.methods.getSelectableNumbers(from, to).call()
      const result = [];
      // switch
      for (const number of numbers) {
        if (targets.includes(number.toNumber())) {
          const obj = {num: number.toNumber(), soldout: false}
          result.push(obj)
        } else {
          const obj = {num: number.toNumber(), soldout: true}
          result.push(obj)
        }
      }
      console.log(result)
      return result
    },
    selectNumber: function (num) {
      this.selectedNumber = num
    },
    buy: async function (passcode) {

    },

  }
}
</script>