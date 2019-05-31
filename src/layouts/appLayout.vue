<template>
  <div>
    <v-navigation-drawer
      persistent
      width="230"
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list>
        <v-list-tile v-for="(item, i) in orderedNavs" :key="i" :to="{path: `/${item.link}`}" :exact="i === 0">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app dark :clipped-left="clipped" v-show="validUser" color="primary">
      <v-toolbar-title class="d-flex align-center ml-0 mr-2">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <a class="logo" href="/">
          <img src="/static/logo.png" title="Logo" />
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y transition="slide-y-transition" bottom v-if="!$route.meta.candidateView">
          <v-avatar color="red" slot="activator">
            <span class="white--text headline">{{userChar}}</span>
          </v-avatar>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
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
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      validUser: true,
      user: {
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
      },
      navs: [],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      userChar: ''
    };
  },
  computed: {
    orderedNavs: function() {
      return this.navs.sortBy('order');
    },
    ...mapGetters(['snackbar'])
  },
  methods: {
    logout() {
        this.$store.dispatch('logout', {}).then(() => {
          this.$router.push('/login');
        });
    }
  },
  created() {
    this.navs = [
      {
        icon: 'dashboard',
        title: 'Articles Listing',
        link: '',
        order: 1
      }
    ];
  },
  mounted() {
    this.userChar = (this.$store.getters.user.firstName).charAt(0).toUpperCase();
  }
};

Array.prototype.sortBy = function(p) {
  return this.slice(0).sort(function(a, b) {
    return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
  });
};
</script>
