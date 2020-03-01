<template>
  <div class="home">
    <PairingScreen />
  </div>
</template>

<script>
// @ is an alias to /src
import PairingScreen from "@/components/PairingScreen.vue";

export default {
  name: "PairingView",
  components: {
    PairingScreen
  }
};
</script>
