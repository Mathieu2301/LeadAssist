<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  computed: {
    transitionName() {
      return `slide-${this.$route.path === '/' ? 'right' : 'left'}`;
    },
  },
};
</script>

<style>
:root {
  --color0: #000;
  --color1: #FFF;
  --color2: #fafdff;
  --color5: #131e29;
  --color6: #2d4252;
  --color7: #455f73;
  --color8: #049467;
  --color9: #00b176;
  --red:    #ff4e4e;
}
body {
  margin: 0;
  background-color: var(--color6);
}
body * {
  transition-duration: .1s;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color2);
}
.clickable, .selectable { cursor: pointer }

@media screen and (max-width: 800px) {
  .negligible { display: none }
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: .5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(65%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-65%, 0);
}
.middle {
  position: absolute;
  --width: 900px;
  top: 30%;
  left: calc(50% - (var(--width)/2));
  width: var(--width);
}
table {
  border-collapse: collapse;
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;
  line-height: 40px;
}
th, td {
  padding: 8px;
  text-align: left;
}
tr {
  border-bottom: 1px solid var(--color7);
}
.selectable:hover {
  border-bottom: 1px solid var(--color9);
}

.score {
  display: grid;
  grid: 100% / 1fr 1fr;
  margin: 5px auto !important;
  grid-gap: 3px;
  background-color: var(--color9);
}

.score > div {
  background-color: var(--color6);
  font-weight: 900;
  line-height: 30px;
  padding: 0 10px;
}

.score > .t:not(.selected)  { color: #ffa500 }
.score > .ct:not(.selected) { color: #00a1ff }
.score > .t.selected  { background-color: #ffa500 }
.score > .ct.selected { background-color: #00a1ff }

.text_left { text-align: left }
.text_center { text-align: center }
.text_right { text-align: right }
</style>
