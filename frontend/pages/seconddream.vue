<template>
  <v-layout>
    <v-flex md12>
      <div class="text-xs-center">
        <p class="display-2">SECOND DREAM</p>
        <p>{{challengeMsg}}</p>
        <v-btn :disabled="!canApply" @click="challenge()">CHALLENGE</v-btn>
        <v-alert :value="completeChallenge" type="success" transition="scale-transition" outline>We accepted your offer! Please wait until the end of the term.</v-alert>
        <v-divider/>
        <v-divider/>
        <p>Currently, we have </p><span class="display-4"> {{applicantsNumber}}</span><p> applicants!</p>
        <p>The term of this challenge is from 1.MAY.2019 to 31.AUG.2019</p>
        <v-btn @click="$router.push(`/`)">BACK TO TOP</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Web3 from 'web3'
import secondLotteryJSON from '~/contracts/SecondDream.json'
const web3 = new Web3(Web3.givenProvider)
const secondLotteryABI = secondLotteryJSON.abi
const secondLotteryAddress = secondLotteryJSON.networks[5777].address
const secondLottery = web3.eth.Contract(secondLotteryABI, secondLotteryAddress)
const playerAddress = window.web3.eth.accounts[0]

export default {
  components: {},
  data () {
    return {
      applicantsNumber: 0,
      challengeMsg: 'You can challenge a second dream',
      canApply: true,
      completeChallenge: false
    }
  },
  // When we use `this` before function, we have to describe `async function ()` instead of `async () =>`
  created: async function () {
    await this.fetchApplicants()
  },
  methods: {
    getPrice: function () {
      return this.price
    },
    challenge: async function () {
      const _this = this
      console.log(window.web3.eth.accounts)
      const encodedData = secondLottery.methods.challenge().encodeABI()
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
      secondLottery.events.Challenge().on('data', function (event) {
        const data = event.returnValues
        console.log(event)
        console.log(data[0])
        
        _this.completeChallenge = true
        _this.applicantsNumber++

        // TODO: it's possible to apply several times
        _this.canApply = false
        _this.challengeMsg = "Sorry, you don't have a right to challenge any more."
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
        to: secondLotteryAddress,
        gasPrice: web3.utils.toHex(3 * 1e10),
        gasLimit: web3.utils.toHex(5000000),
        nonce: '0x' + txCount.toString(16),
        value: value,
        data: encodedData,
        chainId: 42 // Why 42
      }
    },
    fetchApplicants: async function () {
      const applicants = await secondLottery.methods.getApplicants().call()
      console.log(applicants)
      this.applicantsNumber = applicants.length
      return applicants
    }
  }
}
</script>