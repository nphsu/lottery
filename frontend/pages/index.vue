<template>
  <v-layout column justify-center align-center>
    <v-flex md12>
      <div class="text-xs-center">
        <p class="display-2">MENU</p>
        <v-btn @click="$router.push(`/dreamtickets`)">DREAM TICKETS</v-btn>
        <v-btn @click="$router.push(`/seconddream`)">SECOND DREAM</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  components: {
  }
}
</script>
