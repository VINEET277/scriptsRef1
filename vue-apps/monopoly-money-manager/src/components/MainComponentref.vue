<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" width="80">
    <h1>Monopoly Money Manager</h1>
    <div class="players" id="hari" v-on:click="handlescore">Hariharan  {{ (scores.hari / 1000000).toFixed(2) }} M</div>
    <div class="players" id="rukm" v-on:click="handlescore">Rukmangadan {{ (scores.rukm / 1000000).toFixed(2) }} M</div>
    <div class="players" id="raji" v-on:click="handlescore">Raji {{ (scores.raji / 1000000).toFixed(2) }} M</div>
    <div class="players" id="kamala" v-on:click="handlescore">Kamala {{ (scores.kamala / 1000000).toFixed(2) }} M</div>

    <div class="monopolymodal" v-show="modalShow">
      <input type="number" v-model="amount" v-on:click="selectText"/>
      <br/><br/>
      <select v-model="multiplier">
        <option value="1000" selected>K</option>
        <option value="1000000">M</option>
      </select>
      <br/><br/>
      <select v-model="sign">
        <option value="1" selected>+</option>
        <option value="-1">-</option>
      </select>
      <br/><br/>
      <button v-on:click="donecalc">Done</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const scores = ref({
      hari: 40000000,
      rukm: 40000000,
      raji: 40000000,
      kamala: 40000000,
    });

    const currentPlayer = ref('');

    const amount = ref(0);
    const multiplier = ref(1000);
    const sign = ref(1);
    const modalShow = ref(false);

    const handlescore = (e) => {
      modalShow.value = true;
      let player = e.target.id;
      console.log(player);

      currentPlayer.value = player;
    }

    const selectText = (e) => {
      e.target.select();
    }

    const donecalc = (e) => {
      let player = currentPlayer.value;

      scores.value[player] += parseFloat(amount.value) * parseFloat(multiplier.value) * parseFloat(sign.value);

      modalShow.value = false;
    }

    return { scores, handlescore, amount, multiplier, sign, modalShow, selectText, donecalc }
  },
}
</script>

<style scoped>
  .players {
    padding: 10px;
    margin: 10px;
    border: 2px solid grey;
    font-size: 40px;
    user-select: none;
  }
  .scores {
    padding: 10px;
    font-size: 35px;
  }
  .monopolymodal {
    position: fixed;
    top: 20%;
    left: 20%;
    height: 70%;
    width: 60%;
    background: #DDD;
    padding: 20px;
  }
</style>
