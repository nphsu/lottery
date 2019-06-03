<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <v-btn @click="$router.push(`/dreamtickets`)">DREAM TICKETS</v-btn>
      <v-btn @click="$router.push(`/seconddream`)">SECOND DREAM</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  components: {
  }
}
</script>
