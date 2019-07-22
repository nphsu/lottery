<template>
  <v-layout>
    <v-flex md12>
      <div class="text-xs-center">
        <v-text-field v-model="ethaddress" label="Ethereum Address"></v-text-field>
        <v-text-field v-model="username" label="User Name"></v-text-field>
        <v-text-field v-model="mailaddress" label="Mail Address"></v-text-field>
        <v-btn outline color="indigo" @click="signup()">Signup</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      mailaddress: null,
      ethaddress: null
    }
  },
  created: async function () {
    await this.loadAccount()
  },
  methods: {
    loadAccount: async function () {
      const account = await window.ethereum.enable()
      const defaultAccount = account[0]
      this.ethaddress = defaultAccount
      this.username = 'Guest'
    },
    signup: function() {
      console.log('signup')
      this.$router.push(`/`)
    }
  }
}
</script>