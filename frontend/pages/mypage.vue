<template>
  <v-layout>
    <v-flex md12>
      <div class="text-xs-center">
        <p class="display-2">DREAM TICKETS</p>
        <p>Now is available (1.Aug.2019 - 14.Aug.2019)</p>
        <v-layout>   
          <v-flex md12>
            <v-btn @click="createUrl()">URL</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// import Web3 from 'web3'
// import dreamTicketJSON from '~/contracts/DreamTicket.json'
// import dreamticketsVue from '../dreamtickets.vue';
// const web3 = new Web3(Web3.givenProvider)
// const dreamTicketABI = dreamTicketJSON.abi
// const dreamTicketAddress = dreamTicketJSON.networks[5777].address
// const dreamTicket = web3.eth.Contract(dreamTicketABI, dreamTicketAddress)
const playerAddress = window.web3.eth.accounts[0]

export default {
  components: {},
  data () {
    return {
    }
  },
  methods: {
    createUrl: function () {
      const url = `localhost:3000/${playerAddress}`
      console.log(url)
    },
  }
}
</script>