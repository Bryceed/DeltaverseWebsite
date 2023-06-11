<template>
  <v-app :dark="$vuetify.theme.dark">
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-btn @click.stop="miniVariant = !miniVariant"
        icon
        :class="{
          'v-btn--icon': miniVariant,
          'v-btn--icon v-btn--router': !miniVariant
        }">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-divider />
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title :class="item.color + '--text'">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item v-for="(item, i) in itemsSocial" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="!clipped && !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><b>{{ title }}</b></v-toolbar-title>
      <v-spacer />
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(action, i) in actions[auth]" :key="i" :to="action.to" router exact>
            <v-list-item-action>
              <v-icon>{{ action.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ action.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main :clipped-left="clipped" :fixed="fixed">
      <v-container fluid>
        <Nuxt :transition="{
        name: 'bounce',
        mode: 'out-in'
      }" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    auth () {
      return this.$store.state.auth.loggedIn ? 'user' : 'anonynous'
    },
    isDrawerOpen () {
      return this.$vuetify.breakpoint.name !== 'xs' && this.drawer
    }
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-newspaper-variant-outline',
          title: 'Notícias',
          to: '/news'
        },
        {
          icon: 'mdi-web',
          title: 'Community',
          to: '/community'
        },
        {
          title: 'Prêmios',
          icon: 'mdi-medal',
          to: '/awards'
        },
        {
          title: 'Assinaturas',
          icon: 'mdi-crown',
          to: '/team',
          color: 'amber'
        }
      ],
      itemsSocial: [
        {
          icon: 'mdi-twitch',
          title: 'Twitch',
          to: '/twitch'
        },
        {
          icon: 'mdi-facebook',
          title: 'Facebook',
          to: '/facebook'
        }
      ],
      actions: {
        anonynous: {
          0: {
            icon: 'mdi-login',
            title: 'Login',
            to: '/auth/login'
          },
          1: {
            icon: 'mdi-account-plus',
            title: 'Register',
            to: '/auth/register'
          }
        },
        user: {
          0: {
            icon: 'mdi-account',
            title: 'Profile',
            to: '/profile'
          },
          1: {
            icon: 'mdi-logout',
            title: 'Logout',
            to: '/auth/logout'
          }
        },
        admin: {
          0: {
            icon: 'mdi-account',
            title: 'Profile',
            to: '/profile'
          },
          1: {
            icon: 'mdi-logout',
            title: 'Logout',
            to: '/logout'
          }
        }
      },
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'DELTAVERSE'
    }
  }
}
</script>

<style>
.v-navigation-drawer .v-divider {
  margin: 8px 0;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
