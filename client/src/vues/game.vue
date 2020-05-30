<template>
  <div class="home">
    <div class="top">
      <div class="third">{{ game.infos.map }}</div>
      <div class="third score">
        <div class="ct" :class="{ selected: game.infos.team == 'CT' }">
          {{ game.infos.scores.CT.score }}
        </div>
        <div class="t" :class="{ selected: game.infos.team == 'T' }">
          {{ game.infos.scores.T.score }}
        </div>
      </div>
      <div class="third">{{ game.infos.round.phase }}</div>

      <template v-if="bomb_planted || bomb_defused"> <!-- Bombe plantée -->
        <img alt="Defuse kit" src="/assets/weapon-a/item_defuser.svg" v-if="team_haskit">
        <img alt="Bomb planted" src="/assets/weapon-a/weapon_c4.svg" v-if="bomb_planted">
        <img alt="Bomb defused" src="/assets/weapon/weapon_c4.svg" v-if="bomb_defused">
        <div class="bomb_time" :class="{
          red_text:    (team_haskit && bomb_time <= 5)  || (!team_haskit && bomb_time <= 10),
          yellow_text: (team_haskit && bomb_time <= 10) || (!team_haskit && bomb_time <= 15)
        }">{{ bomb_time }}</div>
      </template>

      <div v-else-if="bomb_exploded">La bombe a explosée</div>
      <div v-else>Bombe pas plantée</div>

    </div>

    <div class="players">

      <div
        class="player"
        v-for="(player, id) in game.players"
        :key="id"
        @click="select(id)"
        :class="{
          blind:   player.state.flashed > 200,
          burning: player.state.burning > 200,
          smoked:  player.state.smoked  > 200,
        }"
      >

        <div class="title text_center" :class="{
          red_text: player.activity == 'menu',
          yellow_text: player.activity == 'textinput'
        }">{{ player.name }}</div>

        <div class="bar half green" :class="{
          red: player.state.health <= 20
        }"><div class="content" :style="{
          width: player.state.health + '%'
        }"> {{player.state.health}} HP</div></div>

        <div class="half text_center">{{ player.state.money }}$</div>

        <div class="bar line half" :class="{
          blue: player.state.helmet
        }"><div class="content" :style="{
          width: player.state.armor + '%'
        }"></div></div>

        <!-- <div class="bar third white status"><div class="content" :style="{
          width: player.state.flashed / 255 * 100 + '%'
        }"> Flashed</div></div>

        <div class="bar third orange status"><div class="content" :style="{
          width: player.state.burning / 255 * 100 + '%'
        }"> Burning</div></div>

        <div class="bar third grey status"><div class="content" :style="{
          width: player.state.smoked / 255 * 100 + '%'
        }"> Smoked</div></div> -->

        <div class="weapons">
          <div class="weapon" v-for="(w, id) in player.weapons" :key="id">
            <img
              class="image"
              :alt="w.name"
              :src="'/assets/weapon'+(w.state === 'active' ? '-a' : '')+'/' + w.name + '.svg'"
            >
            <div class="bullets" v-if="w.ammo_clip">{{w.ammo_clip}} / {{w.ammo_reserve}}</div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Game',

  data() {
    return {
      team_haskit: false,
      team_equip: 0,

      bomb_planted: false,
      bomb_defused: false,
      bomb_exploded: false,
      bomb__interval: false,
      bomb_time: 0,


      game: {
        infos: {
          map: 'de_cache',
          mode: 'casual',
          round: {
            phase: 'live',
          },
          rounds: '',
          history: {
            1: 't_win_elimination',
            2: 't_win_bomb',
            3: 'ct_win_elimination',
            4: 'ct_win_defuse',
          },
          spec: '',
          scores: {
            CT: '',
            T: '',
          },
        },
        players: {
          1234567890: {
            name: '',
            activity: '',
            team: '',
            stats: '',
            state: '',
            weapons: '',
          },
        },
      },
    };
  },

  created() {
    this.events.set((data) => {
      if (data[this.$route.params.gameid]) {
        this.game = data[this.$route.params.gameid];

        if (this.game.infos.round.bomb === 'planted') {
          if (!this.bomb_planted) {
            this.bomb_planted = true;
            this.bomb_time = 39;

            if (!this.bomb__interval) clearInterval(this.bomb__interval);
            this.bomb__interval = setInterval(() => {
              if (this.bomb_time > 0) this.bomb_time -= 1;
              else clearInterval(this.bomb__interval);
            }, 1000);
          }
        } else this.bomb_planted = false;

        if (this.game.infos.round.bomb === 'defused') {
          this.bomb_time = 0;
          this.bomb_defused = true;

          if (this.bomb__interval) {
            clearInterval(this.bomb__interval);
            this.bomb__interval = false;
          }
        } else this.bomb_defused = false;

        if (this.game.infos.round.bomb === 'exploded') {
          this.bomb_exploded = true;
        } else this.bomb_exploded = false;

        this.team_haskit = false;
        this.team_equip = 0;
        Object.keys(this.game.players).forEach((pid) => {
          if (this.game.players[pid].state.defusekit) {
            this.team_haskit = true;
            this.game.players[pid].weapons.defusekit = {
              name: 'item_defuser',
              state: 'active',
              type: 'Defuse Kit',
            };
          }
          this.team_equip += this.game.players[pid].state.equip_value;
          // Object.values(p.weapons).forEach((w) => {
          // });
        });
      } else this.$router.replace('/');
    });
  },
};
</script>

<style scoped>
.top {
  background-color: var(--color7);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
}

.top > div { margin: 11px 0 }

.players {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin: 4px;
}

.player {
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  text-align: left;
  width: 100%;
  max-width: 500px;
  padding: 5px;
  border-bottom: solid 3px var(--color8);
  background-color: #455f73;
}

.player.burning {
  background-color: #ffa500;
  color: var(--color0);
}

.player.smoked {
  background-color: #aaaaaa;
    color: var(--color1);
}

.player.blind {
  background-color: var(--color1);
  color: var(--color0);
}

.player > .title {
  width: 100%;
  font-size: 20px;
  padding-bottom: 3px;
}

.weapons {
  display: flex;
  flex-flow: wrap;
  width: 100%;
  justify-content: space-around;
  margin-top: 5px;
}

.weapon img {
  height: 30px;
}

.weapon .bullets {
  font-size: 12px;
  line-height: 8px;
}

.bar {
  background-color: #455f73;
  margin: 2px 0;
}

.bar.line { height: 2px; margin: 0; }

.bar > .content {
  background-color: var(--color7);
  height: 100%;
  text-align: center;
  white-space: nowrap;
}

.bar.green > .content { background-color: var(--color8) }
.bar.blue > .content { background-color: #2568d4 }
.bar.white > .content { background-color: #FFF }
.bar.grey > .content { background-color: #aaaaaa }
.bar.orange > .content { background-color: var(--red) }
.bar.red > .content { background-color: var(--red) }

.bar.status > .content { color: var(--color7) }

.full  { width: 100% }
.half  { width: 50% }
.third { width: calc(100% / 3); }

.green_text { color: var(--color9) }
.yellow_text { color: #d3c71e }
.red_text { color: var(--red) }

</style>
