<template>
  <div class="home">
    <!-- <div class="game" v-for="(game, id) in games" :key="id">
      <div class="top three">
        <div>{{ game.infos.map }}</div>
        <div class="score">
          <div class="ct">{{ game.infos.scores.CT.score }}</div>
          <div class="t">{{ game.infos.scores.T.score }}</div>
        </div>
        <div>{{ game.infos.round.phase }}</div>
      </div>
      <div class="top two">
        <div>{{ game.infos.mode }}</div>
        <div>{{ game.infos.round.bomb }}</div>
      </div>
    </div> -->

    <table>
      <tr>
        <th class="text_center">Map</th>
        <th class="text_center">Mode</th>
        <th class="text_center">Team</th>
        <th class="text_center">Score</th>
      </tr>

      <tr class="selectable" v-for="(game, id) in games" :key="id"
        @click="select(id)"
      >
        <td class="text_center">{{ game.infos.map }}</td>
        <td class="text_center">{{ game.infos.mode }}</td>
        <td class="text_center">{{ game.infos.team }}</td>
        <td class="text_center">
          <div class="score">
            <div class="ct" :class="{ selected: game.infos.team == 'CT' }">
              {{ game.infos.scores.CT.score }}
            </div>
            <div class="t"  :class="{ selected: game.infos.team == 'T' }">
              {{ game.infos.scores.T.score }}
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'LeadAssist',

  data() {
    return {
      games: {},
    };
  },

  methods: {
    select(id) {
      this.$router.push(`/game/${id}`);
    },
  },

  created() {
    this.events.set((data) => {
      this.games = data;
    });
  },
};

</script>

<style scoped>

</style>
