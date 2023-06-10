<template>
  <div>
    <v-row class="fill-height">
      <v-col cols="12" md="6" offset-md="1" class="mt-12">
        <v-alert type="info" dismissible class="mb-12">
          <span>"O site está em fase inicial de construção. Peço desculpas de antemão por qualquer erro ou bug que possa encontrar durante esse período."<br/>
          <b>- Bryceed</b>
          </span>
        </v-alert>
        <h1>Boas-vindas!</h1>
        <v-divider></v-divider>
        <p class="my-6 text-justify">
          Deltaverse é um projeto de longo prazo que nunca havia saído, de fato, do papel para o mundo... até agora.
        </p>
        <p class="mt-6 text-justify">
          O nosso foco é criar customizações voltadas para as interações sociais dentro do servidor de Minecraft, com o objetivo de tornar a experiência de jogo mais divertida e agradável para todos os jogador@s.
        </p>
        <p class="mt-6 text-justify">
          Ainda estamos em fase de desenvolvimento, mas você pode acompanhar o progresso do projeto através do nosso <a href="https://discord.gg/" target="_blank">Discord</a>.
        </p>
      </v-col>
      <v-col cols="12" md="4" offset-md="1" class="mt-9">
        <minecraft-server-status />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>
