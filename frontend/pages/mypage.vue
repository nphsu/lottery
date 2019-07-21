<template>
  <v-layout>
    <v-flex md12>
      <div class="text-xs-center">
        <p class="display-2">DREAM TICKETS</p>
        <p>Now is available (1.Aug.2019 - 14.Aug.2019)</p>
        <v-layout>
          <v-flex md12>
            <v-btn @click="checkAlreadyBought()">URL</v-btn>
            <p>You can send this below link to get a right of challenging Second Dream!</p>
            <p>{{affiliateLink}}</p>
            <div class="text-xs-center">
              <v-btn @click="$router.push(`/`)">BACK TO TOP</v-btn>
            </div>
          </v-flex>
        </v-layout>
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
  data() {
    return {
      affiliateLink: null,
      boughtNumbers: null
    }
  },
  created: async function() {
    await this.getBoughtNumbers()
    // TODO: change to a real domain and a url
    this.showAffiliateLink()
  },
  methods: {
    getBoughtNumbers: async function() {
      const boughtNumbers = await dreamTicket.methods
        .getNumbersOnBuyTerm(playerAddress)
        .call()
      this.boughtNumbers = boughtNumbers
    },
    showAffiliateLink: function() {
      if (this.boughtNumbers.length === 0) {
        this.affiliateLink =
          'You have to buy a ticket before you will introduce someone and get a right to challenge Second Dream'
      } else {
        this.affiliateLink = `http://localhost:3000/${playerAddress}`
      }
    }
  }
}
</script>