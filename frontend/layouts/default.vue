<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-btn outline color="indigo" @click="signin()">{{username}}</v-btn>
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Web3 from 'web3'
// import dreamTicketJSON from '~/contracts/DreamTicket.json'
const web3 = new Web3(Web3.givenProvider)
// const dreamTicketABI = dreamTicketJSON.abi
// const dreamTicketAddress = dreamTicketJSON.networks[5777].address
// const dreamTicket = web3.eth.Contract(dreamTicketABI, dreamTicketAddress)

export default {  
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'TOP PAGE',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'DREAM TICKETS',
          to: '/dreamtickets'
        },
        {
          icon: 'bubble_chart',
          title: 'SECOND DREAM',
          to: '/seconddream'
        },
        {
          icon: 'format_list_numbered_rtl',
          title: 'TERMS OF SERVICE',
          to: '/tos'
        },
        
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'DreamTicket',
      username: 'LOGIN'
    }
  },
  created: async function () {
    await this.loadAccount()
  },
  methods: {
    loadAccount: async function () {
      const account = await window.ethereum.enable()
      const defaultAccount = account[0]
      web3.eth.defaultAccount = defaultAccount
      this.username = 'Guest'
    },
    signin: function () {
      this.$router.push('/signup')
    }
  }
}
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>