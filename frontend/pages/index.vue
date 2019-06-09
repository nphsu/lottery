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
        <p>caution: MetaMask is necessary to play this system. If you haven't installed yet, you should install it now.</p>
        <v-divider/>
      </div>
    </v-flex>
    <v-flex md12>
      <v-layout row justify-space-between>
        <v-flex md6>
          <v-card class="card-wapper" @click="$router.push(`/dreamtickets`)">
            <v-img class="white--text" height="200px" :src="cazinoImage">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">DREAM TICKETS</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-text>
              <div>
                <span class="grey--text">It is available</span><br>
                <span>You can buy a ticket which is perhaps win 10000ETH!</span><br>
                <span>The one in every 5000 always win!!</span><br>
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
                <span>You can buy a ticket which is perhaps win 10000ETH!</span><br>
                <span>The one in every 5000 always win!!</span><br>
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
                    <span class="headline">MYPAGE</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-text>
              <div>
                <span class="grey--text">It is available</span><br>
                <span>You can buy a ticket which is perhaps win 10000ETH!</span><br>
                <span>The one in every 5000 always win!!</span><br>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-divider/>
        <v-flex md6>
          <v-card class="card-wapper" @click="$router.push(`/tos`)">
            <v-img class="black--text" height="200px" :src="documentImage">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">Terms of Service</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-text>
              <div>
                <span class="grey--text">It is available</span><br>
                <span>You can buy a ticket which is perhaps win 10000ETH!</span><br>
                <span>The one in every 5000 always win!!</span><br>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-divider/>
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
