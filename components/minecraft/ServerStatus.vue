<template>
  <div>
    <h2>Server Status
      <v-btn icon @click="getServerStatus">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </h2>
    <v-divider></v-divider>
    <v-card elevation="2" @loading="serverStatusData === null" class="server-unknown list-hidden">
      <v-img
        id="_server-icon"
        :lazy-src="`https://media.discordapp.net/attachments/593632773353504804/767298990680834088/unknown.png?width=30&height=12`"
        src='https://media.discordapp.net/attachments/593632773353504804/767298990680834088/unknown.png?width=788&height=467'
        height="200px">
        <div class="text-h5 font-weight-bold white--text" style="position: absolute; bottom: 0; right: 0; padding: 10px 17px; backdrop-filter: blur(20px); margin: 10px; border-radius: 10px;">
          <div id="__online-indicator" style="display: flex; flex-direction: row; align-items: center; justify-content: center; line-height: 100%;">
            <v-badge
              color="green"
              text-color="white"
              small
              inline
              left
              overlap
              style="margin-right: 5px;"
            ></v-badge>
            <span><span id="serverTotalOnline"></span><small>/<span id="serverMaxOnline"></span></small></span>
          </div>
          <span id="__offline-indicator">
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
              <span id="serverMOTD"></span>
            </h3>
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
    <div id="mc-embed"></div>
  </div>
</template>

<script src="/js/jquery-3.7.0.min.js"></script>
<script>
const serverStatus = 'https://api.mcsrvstat.us/2/mc.rydermais.com'
let serverStatusData = null;
let ping = 0;

function getServerStatus () {
  $.getJSON(serverStatus, (data) => {
    serverStatusData = data
  }).then(() => {
    console.log(serverStatusData)
    console.log('Total players online: ' + serverStatusData.players.online)
    getPing()
  }).catch((err) => {
    console.error(err)
  })

}

function getPing () {
  // ping mc.rydermais.com to get the server ping comparing the difference between the time the request was sent and the time the response was received
  const start = Date.now()
  $.ajax({
    url: serverStatus,
    timeout: 30000,
    type: 'GET',
    success: (data) => {
      const end = Date.now()
      ping = end - start
      console.log('Server ping: ' + ping + 'ms')
    },
    error: (err) => {
      console.error(err)
    }
  }).then(() => {
    renderServerStatus(serverStatusData)
  })
}

function renderServerStatus (serverStatusData) {
  const mcEmbed = document.getElementById('mc-embed')
  // insert the data into the div
  const mcEmbedHTML = `
    <div class="mc-embed">
      <div class="mc-embed__title">
        Ping: ${ping}ms <div id="signalWave" data-value="${ping}" data-size="small">
          <div class="signal-wave__bar"></div>
          <div class="signal-wave__bar"></div>
          <div class="signal-wave__bar"></div>
          <div class="signal-wave__bar"></div>
          <div class="signal-wave__bar"></div>
        </div> ${serverStatusData.version ?? `| Versão: + ${serverStatusData.version}`}
        ${(serverStatusData.version && serverStatusData.software) ?? (" (" +serverStatusData.software+ ")")}
      </div>
      <div class="mc-embed__body">
        <div class="mc-embed__body__players">
          ${serverStatusData.players.online > 0 ? `<div class="mc-embed__body__players__title">Players conectados</div>` : ''}
          <div class="mc-embed__body__players__list">
            ${serverStatusData !== null && serverStatusData.players.list ? serverStatusData.players.list.map((player) => {
              return `<div class="mc-embed__body__players__list__player">
                <img src="http://cravatar.eu/avatar/${player}/16.png" onerror="this.src='https://minotar.net/avatar/steve/16.png'">
                <span>${player}</span>
              </div>`
            }).join('') : ''}
          </div>
        </div>
        <div class="mc-embed__body__version">
          <span></span>
        </div>
      </div>
    </div>
  `
  mcEmbed.innerHTML = mcEmbedHTML

  const elServerTotalOnline = document.getElementById('serverTotalOnline')
  const elServerMaxOnline = document.getElementById('serverMaxOnline')
  const elServerMOTD = document.getElementById('serverMOTD')

  $('.server-unknown')
  .removeClass('server-unknown')
  .addClass('server-' + (serverStatusData.online ? 'online' : 'offline'))

  if(serverStatusData.players.online > 0) { $('.list-hidden').removeClass('list-hidden') }
  if(serverStatusData.icon) { $('#_server-icon').attr('src', serverStatusData.icon) }
  if(serverStatusData.players.online) { elServerTotalOnline.innerHTML = serverStatusData.players.online; console.log(elServerTotalOnline)}
  if(serverStatusData.players.max) { elServerMaxOnline.innerHTML = serverStatusData.players.max; console.log(elServerMaxOnline)}
  if(serverStatusData.motd.clean[0]) { elServerMOTD.innerHTML = serverStatusData.motd.clean[0]; console.log(elServerMOTD)}

  if (serverStatusData.online) {
    $('#__online-indicator').css('display', 'flex')
    $('#__offline-indicator').css('display', 'none')
  } else {
    $('#__online-indicator').css('display', 'none')
    $('#__offline-indicator').css('display', 'flex')
  }

  // >150ms = 5 bars >300ms = 4 bars >400ms = 3 bars >1000ms = 2 bars <1001ms = 1 bar
  if (ping < 300) {
    $('#signalWave').attr('data-size', 'small')
  } else if (ping >= 300 && ping < 400) {
    $('#signalWave').attr('data-value', ping)
    $('#signalWave').attr('data-size', 'medium')
  } else if (ping >= 400 && ping < 1000) {
    $('#signalWave').attr('data-value', ping)
    $('#signalWave').attr('data-size', 'large')
  } else if (ping >= 1000 && ping < 10000) {
    $('#signalWave').attr('data-value', ping)
    $('#signalWave').attr('data-size', 'full')
  } else {
    $('#signalWave').attr('data-value', ping)
    $('#signalWave').attr('data-size', 'small')
  }

}

export default {
  name: 'MinecraftServerStatus',
  data () {
    return {
      serverStatusData
    }
  },
  mounted () {
    getServerStatus()
  },
}
</script>

<style scoped>
  small {
    font-size: 0.6em;
    color: rgba(255, 255, 255, 0.5);
  }
</style>
