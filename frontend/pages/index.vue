<template>
  <v-layout column justify-center align-center>
    <v-flex md12>
      <div class="text-xs-center">
        <p class="display-2">MENU</p>
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
      <div class="text-xs-center">
        <v-btn @click="$router.push(`/tos`)" outline>Terms of Service</v-btn>
      </div>
    </v-flex>
    
  </v-layout>
</template>

<script>
import CazinoImage from '~/assets/image/cazino.jpg'
import RouletteImage from '~/assets/image/roulette.jpeg'
export default {
  components: {
  },
  data () {
    return {
      cazinoImage: CazinoImage,
      rouletteImage: RouletteImage
    }
  }
}
</script>
<style scoped>
.card-wapper {
  margin: 10px;
}
</style>
