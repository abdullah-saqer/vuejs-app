<template>
  <div>
    <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-title class="d-flex align-center ml-0 mr-2">
            <a class="logo" href="/">
                <img src="/static/logo.png" title="Placeholder Logo" />
            </a>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn to="register" outline color="indigo">register</v-btn>
        <v-btn to="login" outline color="teal">login</v-btn>
    </v-toolbar>
    <v-content>
      <v-snackbar
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        v-model="snackbar.visible"
        :top="snackbar.top"
        :left="snackbar.left"
        :right="snackbar.right"
        :bottom="snackbar.bottom"
      >
        {{ snackbar.text }}
        <v-btn v-if="snackbar.close" dark flat @click="closeSnackbar">Close</v-btn>
      </v-snackbar>
      <v-slide-y-transition mode="out-in">
          <router-view></router-view>
      </v-slide-y-transition>
    </v-content>
  </div>
</template>

<style>
  .logo img {
    width: 150px;
    vertical-align: middle;
  }
</style>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        clipped: true,
        fixed: false,
      }
    },
    computed: {
      ...mapGetters(['snackbar'])
    },
    methods: {
      closeSnackbar() {
        this.$store.dispatch('closeSnackbar');
      }
    }
}
</script>
