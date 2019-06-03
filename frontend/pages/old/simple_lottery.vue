<template>
  <v-layout>
    <v-flex>
      <div class="text-xs-center">
        <p>Simple Lottery</p>
        <v-btn @click="getTicketPrice()">GetName</v-btn>
        <v-btn @click="getRand()">GetRand</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Web3 from 'web3'
import simpleLotteryJSON from '~/contracts/SimpleLottery.json'
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
const simpleLotteryABI = simpleLotteryJSON.abi
const simpleLotteryAddress = simpleLotteryJSON.networks[5777].address
const simpleLottery = web3.eth.Contract(simpleLotteryABI, simpleLotteryAddress)
      
export default {
  components: {},
  
  methods: {
    getTicketPrice: async function() {
      const showingAccounts = await web3.eth.getAccounts()
      console.log(showingAccounts)
      const name = await simpleLottery.methods.getName().call()
      console.log(name)
    },
    getRand: async function() {
      const rand = await simpleLottery.methods.getRand().call()
      console.log(rand)
    }
  }
}
</script>