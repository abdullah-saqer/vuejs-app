<template>
    <div>
      <div id="loadingWrapper" v-if="loading">
        <img src="/static/logo.png"> 
        <h1 data-text="Loading...">
          Loading...
        </h1>
      </div>
      <v-app v-else>
        <component :is="layout"></component>
      </v-app>
    </div>
</template>

<script>
  import appLayout from './layouts/appLayout'
  import simpleLayout from './layouts/simpleLayout'
  import {verifyJwt} from '@/utilities/functions'
  const default_layout = 'app-layout';
  export default {
    name: 'App',
    data: () => ({
      loading: true
    }),
    created() {
    },
    mounted() {
      const userData = verifyJwt();
      setTimeout(() => {
        if(userData) {
          this.$store.dispatch('login', userData).then(() => {
            this.$store.dispatch('snackbar', {
              color: 'success',
              text: `Welcome, ${this.$store.getters.user.firstName}`
            });
          });
        }
        this.loading = false;
      }, 3000);
    },
    computed: {
      layout () {
        return (this.$route.meta.layout || default_layout);
      }
    },
    components: {
      'app-layout': appLayout,
      'simple-layout': simpleLayout
    }
  }
</script>

<style>
  .v-content__wrap {
    padding: 20px 56px;
  }
  #loadingWrapper {
    margin: 20px 0;
    text-align: center;
  }
  #loadingWrapper img {
    width: 330px;
    margin-bottom: 20px;
  }
  #loadingWrapper h1 {
    font-family: sans-serif;
    position: relative;
    color: rgba(0, 0, 0, .3);
    font-size: 5em;
  }
  #loadingWrapper h1:before {
    content: attr(data-text);
    position: absolute;
    overflow: hidden;
    max-width: 7em;
    white-space: nowrap;
    color: #1976d2;
    animation: loading 3s linear 0s infinite;
  }
  @keyframes loading {
      0% {
          max-width: 0;
      }
  }
</style>
