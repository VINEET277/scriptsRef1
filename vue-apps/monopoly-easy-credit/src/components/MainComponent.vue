<template>
  <div>
    <h1>Monopoly Easy Credit</h1>
    <div class="currenttransaction">{{ transaction }}</div>
    <div class="player" draggable="true" v-on:dragstart="dragstarted" v-on:dragover="allowdragover" v-on:drop="dropped" player="raji">
      <span player="raji">Raji</span><br/><br/>
      <span player="raji" class="balance">{{ amountDisplay(money.raji.balance) }}</span><br/><br/>
      <span player="raji" class="earned">{{ amountDisplay(money.raji.earned) }}</span>
    </div>
    <div class="player" draggable="true" v-on:dragstart="dragstarted" v-on:dragover="allowdragover" v-on:drop="dropped" player="rukmangadan">
      <span player="rukmangadan">Rukmangadan</span><br/><br/>
      <span player="rukmangadan" class="balance">{{ amountDisplay(money.rukmangadan.balance) }}</span><br/><br/>
      <span player="rukmangadan" class="earned">{{ amountDisplay(money.rukmangadan.earned) }}</span>
    </div>
    <div class="player" draggable="true" v-on:dragstart="dragstarted" v-on:dragover="allowdragover" v-on:drop="dropped" player="hari">
      <span player="hari">Hari</span><br/><br/>
      <span player="hari" class="balance">{{ amountDisplay(money.hari.balance) }}</span><br/><br/>
      <span player="hari" class="earned">{{ amountDisplay(money.hari.earned) }}</span>
    </div>
    <div class="player" draggable="true" v-on:dragstart="dragstarted" v-on:dragover="allowdragover" v-on:drop="dropped" player="kamala">
      <span player="kamala">Kamala</span><br/><br/>
      <span player="kamala" class="balance">{{ amountDisplay(money.kamala.balance) }}</span><br/><br/>
      <span player="kamala" class="earned">{{ amountDisplay(money.kamala.earned) }}</span>
    </div>
    <br/>
    <div class="player" draggable="true" v-on:dragstart="dragstarted" v-on:dragover="allowdragover" v-on:drop="dropped" player="bank">
      <span player="bank">Bank</span><br/>
      <span player="bank" style="font-size:10px;" class="balance">{{ amountDisplay(money.bank.balance) }}</span><br/>
      <span player="bank" style="font-size:10px;" class="earned">{{ amountDisplay(money.bank.earned) }}</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';

export default {
  setup() {
    const transaction = ref('');
    const amount = ref(0);
    const multiplier = ref(0);

    const amountDisplay = computed(() => {
      return (amount) => {
        if(parseFloat(amount) < 1){
          return (parseFloat(amount).toFixed(4) * 1000) + ' K'
        } else {
          return parseFloat(amount).toFixed(4) + ' M'
        }
      }
    });

    const fromplayer = ref('');
    const toplayer = ref('');
    const reachedendoftransaction = ref(false);

    const money = ref({
      raji: {
        balance: 60,
        earned: 0
      },
      rukmangadan: {
        balance: 60,
        earned: 0
      },
      hari: {
        balance: 60,
        earned: 0
      },
      kamala: {
        balance: 60,
        earned: 0
      },
      bank: {
        balance: 60,
        earned: 0
      }
    });

    const handleKeypress = () => {
      // console.log('Monitoring Keypress...');
      window.addEventListener('keydown', (e) => {
        let isNumber = /^[0-9]$/i.test(e.key);
        if(isNumber || e.key == '*' || e.key == '/' || e.key == '.'){
          let character = e.key;
          if(character == '*'){
            character = ' M';
            multiplier.value = 1;
          }
          if (character == '/'){
            character = ' K';
            multiplier.value = 0.001;
          }

          if(!reachedendoftransaction.value){
            amount.value = parseFloat(transaction.value);

            transaction.value = transaction.value + character;
          } else {
            transaction.value = character;
            reachedendoftransaction.value = false;
          }

          if(character == ' M' || character == ' K'){
            reachedendoftransaction.value = true;

            console.log(amount.value, multiplier.value);
          }
        }
      });
    }

    onMounted(handleKeypress);

    const makeTransaction = () => {
      money.value[fromplayer.value].balance = parseFloat(money.value[fromplayer.value].balance) - parseFloat(amount.value * multiplier.value);
      money.value[toplayer.value].balance = parseFloat(money.value[toplayer.value].balance) + parseFloat(amount.value * multiplier.value);

      money.value[toplayer.value].earned = parseFloat(money.value[toplayer.value].earned) + parseFloat(amount.value * multiplier.value);
    }

    const allowdragover = (e) => {
      e.preventDefault();
    }

    const dragstarted = (e) => {
      fromplayer.value = e.target.getAttribute('player');
    }

    const dropped = (e) => {
      toplayer.value = e.target.getAttribute('player');
      makeTransaction();
    }

    return { money, amountDisplay, allowdragover, dragstarted, dropped, transaction }
  },
}
</script>

<style scoped>
  .player {
    box-sizing: border-box;
    display: inline-block;
    padding: 20px 40px;
    margin: 10px;
    border: 2px solid grey;
  }

  .currenttransaction {
    box-sizing: border-box;
    position: fixed;
    padding: 15px;
    top: 50px;
    right: 50px;
    width: 100px;
    height: 50px;
    border: 2px solid green;
  }

  .balance {
    font-size: 20px;
    color: blue;
  }

  .earned {
    font-size: 14px;
    color: orange;
  }
</style>