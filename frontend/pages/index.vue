<template>
  <v-layout column justify-center align-center>
    <v-flex md12>
      <div class="text-xs-center">
        <p class="display-2">MENU</p>
        <v-divider/>
      </div>
    </v-flex>
    <v-flex md12>
      <div class="text-xs-center">
        <p>CAUTION: MetaMask is necessary to play this system. If you haven't installed yet, you should install it now.</p>
        <v-divider/>
      </div>
    </v-flex>
    <v-flex md12>
      <v-layout row justify-space-between>
        <v-flex md6>
          <v-card class="card-wapper" @click="$router.push(`/dreamticket/buy`)">
            <v-img class="white--text" height="200px" :src="cazinoImage">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">DREAM TICKET</span>
                    <span>-BUY TERM-</span>                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-text>
              <div>
                <!-- if this term is not a buy term, this panel will dark and disabled. -->
                <span class="grey--text">Now is available (1.Aug.2019 - 14.Aug.2019)</span><br>
                <span>You can buy a ticket in this page.</span><br>
                <span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span><br>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-divider/>
        <v-flex md6>
          <v-card class="card-wapper" @click="$router.push(`/dreamtickets`)">
            <v-img class="black--text" height="200px" :src="documentImage">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">DREAM TICKET</span>
                    <span>-REVEAL TERM-</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-text>
              <div>
                <!-- if this term is not a reveal term, this panel will dark and disabled. -->
                <span class="grey--text">Now is available (16.Aug.2019 - 25.Aug.2019)</span><br>
                <span>Please confirm your number if you bought a ticket.</span><br>
                <span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span><br>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider/>
    </v-flex>
    <v-flex md12>
      <v-layout row justify-space-between>
        <v-flex md6>
          <v-card class="card-wapper" @click="$router.push(`/Mypage`)">
            <v-img class="white--text" height="200px" :src="walletImage">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">MYPAGE/RESULT</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-text>
              <div>
                <span class="grey--text">It is available</span><br>
                <span>You can check the result of the dream tickets</span><br>
                <span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span><br>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-divider/>
        <v-flex md6>
          <v-card class="card-wapper" @click="$router.push(`/seconddream`)">
            <v-img class="white--text" height="200px" :src="rouletteImage">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">SECOND DREAM</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-text>
              <div>
                <span class="grey--text">It is available</span><br>
                <span>You can challenge the second dream.</span><br>
                <span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span><br>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider/>
      <div class="text-xs-center">
        <v-btn @click="$router.push(`/tos`)">TOS</v-btn>    
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import CazinoImage from '~/assets/image/cazino.jpg'
import RouletteImage from '~/assets/image/roulette.jpeg'
import WalletImage from '~/assets/image/wallet.jpg'
import DocumentImage from '~/assets/image/document.jpeg'

export default {
  components: {
  },
  data () {
    return {
      cazinoImage: CazinoImage,
      rouletteImage: RouletteImage,
      walletImage: WalletImage,
      documentImage: DocumentImage
    }
  }
}
</script>
<style scoped>
.card-wapper {
  margin: 15px;
}
</style>
