<template>
  <v-layout>
    <v-flex md12>
      <div class="text-xs-center">
        <p class="display-2">DREAM TICKETS - Reveal-</p>
        <p>Now is available (1.Aug.2019 - 14.Aug.2019)</p>
        <p>You have to reveal a ticket in order to complete the participation.</p>
        <p>You can choose your favorite number below boxies.</p>
        <v-layout row>
          <v-flex md6>
            <v-text-field class="mr-2" v-model="selectedNumber" label="SelectedNumber"></v-text-field>
          </v-flex>
          <v-flex md6>
            <v-text-field class="mr-2" v-model="passcode" label="Passcode"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>   
          <v-flex md12>
            <v-btn @click="reveal()">REVEAL</v-btn>
          </v-flex>
          <v-flex md12>
            <v-btn @click="getTerm()">TERM</v-btn>
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
const web3 = new Web3(Web3.givenProvider)
const dreamTicketABI = dreamTicketJSON.abi
const dreamTicketAddress = dreamTicketJSON.networks[5777].address
const dreamTicket = web3.eth.Contract(dreamTicketABI, dreamTicketAddress)
const playerAddress = window.web3.eth.accounts[0]

export default {
  components: {},
  data () {
    return {
      passcode: '',
      selectedNumber: '',
    }
  },
  methods: {
    reveal: async function () {
      console.log(this.selectedNumber, this.passcode)
      const encodedData = dreamTicket.methods.reveal(this.selectedNumber, this.passcode).encodeABI()
      const txCount = await this.getTxCount(playerAddress)
      const rowTx = this.makeRowTx(encodedData, txCount)

      // The MetaMask Web3 object does not support synchronous methods
      window.web3.eth.sendTransaction(rowTx, (e, id) => {
        if (e) {
          console.error(e)
          console.log(id)
        }
      })
    },
    getTerm: async function () {
      const term = await dreamTicket.methods.getTerm().call()
      console.log(term)
      const buy = await dreamTicket.methods.getBuyCount().call()
      console.log(buy)
      const reveal = await dreamTicket.methods.getRevealCount().call()
      console.log(reveal)
      const commit = await dreamTicket.methods.createCommitment(playerAddress, this.selectedNumber, this.passcode).call()
      console.log(commit)
    },
    getTxCount: async address => {
      const count = await web3.eth.getTransactionCount(address)
      return count
    },
    makeRowTx: (encodedData, txCount) => {
      // const value = 0.001 * 1000000000000000000
      return {
        from: playerAddress,
        to: dreamTicketAddress,
        gasPrice: web3.utils.toHex(3 * 1e10),
        gasLimit: web3.utils.toHex(5000000),
        nonce: '0x' + txCount.toString(16),
        // value: value,
        data: encodedData,
        chainId: 42 // Why 42
      }
    },
  }
}
</script>