<template>
  <div>
    <h2>Server Status
      <v-btn icon @click="getServerStatus">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </h2>
    <v-divider></v-divider>
    <v-card elevation="2" :loading="serverStatusData === null">
      <v-img
        v-if="serverStatusData !== null"
        :lazy-src="`https://media.discordapp.net/attachments/593632773353504804/767298990680834088/unknown.png?width=30&height=12`"
        :src='serverStatusData !== null ? serverStatusData.icon : `https://media.discordapp.net/attachments/593632773353504804/767298990680834088/unknown.png?width=788&height=467`'
        height="200px">
        <div v-if="serverStatusData !== null" class="text-h5 font-weight-bold white--text" style="position: absolute; bottom: 0; right: 0; padding: 10px 17px; backdrop-filter: blur(20px); margin: 10px; border-radius: 10px;">
          <div v-if="serverStatusData.online" style="display: flex; flex-direction: row; align-items: center; justify-content: center; line-height: 100%;">
            <v-badge
              color="green"
              text-color="white"
              small
              inline
              left
              overlap
              style="margin-right: 5px;"
            ></v-badge>
            <span>{{ serverStatusData.players.online }}<small>/{{ serverStatusData.players.max }}</small></span>
          </div>
          <span v-else>
            <v-chip color="red" text-color="white" small>
              Offline
            </v-chip>
          </span>
        </div>
      </v-img>
      <v-card-title>
        <v-row class="fill-height align-center no-gutters text-center text-md-left d-flex justify-space-between align-center">
          <v-col cols="12" md="10">
            <h2>mc.rydermais.com<br/>
            <h3
              class="headline"
            >
            {{ serverStatusData !== null ? serverStatusData.motd.clean[0] : 'Loading...'
            }}</h3>
            </h2>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text v-if="serverStatusData !== null && serverStatusData.players.list.length > 0">
        <v-row v-for="(player, i) in serverStatusData.players.list"
        :key="i"
        class="fill-height align-center no-gutters text-center text-md-left d-flex justify-space-between align-center">
          <v-col cols="12" md="2" class="mx-auto my-2">
            <v-avatar class="mx-auto" tile>
              <v-img :src="`https://minotar.net/avatar/${player}/50.png`"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" md="10">
            <h3
              class="headline"
            >
            {{ player }}
            </h3>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const serverStatus = 'https://api.mcsrvstat.us/2/mc.rydermais.com'

export default {
  name: 'MinecraftServerStatus',
  data () {
    return {
      serverStatus,
      serverStatusData: null
    }
  },
  mounted () {
    this.getServerStatus()
  },
  methods: {
    getServerStatus () {
      fetch(this.serverStatus)
        .then(response => response.json())
        .then((data) => {
          this.serverStatusData = data
        })
        .then(() => {
          console.log('Success:', this.serverStatusData)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
}
</script>

<style scoped>
  small {
    font-size: 0.6em;
    color: rgba(255, 255, 255, 0.5);
  }
</style>
