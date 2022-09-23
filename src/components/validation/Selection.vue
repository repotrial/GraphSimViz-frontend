<template>
  <v-container style="padding-bottom: 32px">
    <v-row justify="center">
      <v-col cols="10" md="6">
      </v-col>
      <v-col cols="10" md="6">
      </v-col>
      <v-col cols="10" md="6">
      </v-col>
    </v-row>
  </v-container>



</template>

<script>

export default {
  name: "Selection",
  components: {},
  props:{
    mobile:{
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    hover_set_gene: false,
    hover_set_disorder: false,
    hover_cluster_gene: false,
    hover_cluster_disorder: false,
  }),


  created() {
    if (this.$route.fullPath !== "/")
      this.$router.push("/")
  },

  methods: {
    isMobile: function () {
      return this.mobile
    },
    getCardImage: function (mode, type) {
      return this.$config.STATIC_PATH + "assets/" + mode + "_" + type + ".avif"
    },
    validationEvent: function (data) {
      this.$emit("startValidationEvent", data)
    }
  }
}
</script>

<style scoped>

</style>