<template>
    <div class="transact">
        <select class="playerstransact" v-model="fromplayer">
            <option value="Bank">Bank</option>
            <option v-for="(player, index) in players" v-bind:key="index" v-bind:value="player.name">{{ player.name }}</option>
        </select>
        <select class="playerstransact" v-model="toplayer">
            <option value="Bank">Bank</option>
            <option v-for="(player, index) in players" v-bind:key="index" v-bind:value="player.name">{{ player.name }}</option>
        </select>
        <br/>
        <input type="range" min="0.01" max="20" step="0.01" v-model="amount" /><br/>
        <input type="number" v-model="amount" v-on:click="hightlightamount"/>
        <button v-on:click="transact">Transact</button>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const fromplayer = ref('Bank');
        const toplayer = ref('Bank');
        const amount = ref(1);

        const players = computed(() => store.getters.getAllPlayers);

        const saveState = () => {
            window.localStorage.setItem('lastmonopolygame', store.getters.getGameStateJSONStr);
            store.dispatch('setSavedGameStatus', true);
        }

        const transact = () => {
            let transactObj = {
                fromplayer: fromplayer.value,
                toplayer: toplayer.value,
                amount: amount.value,
            };
            
            if(fromplayer.value != toplayer.value){
                store.dispatch('transactMoney', transactObj);

                let transaction = (new Date()).toLocaleTimeString() + ' > ' + fromplayer.value + ' credited ' + parseFloat(amount.value).toFixed(2) + ' Million to ' + toplayer.value;
                store.dispatch('addToTransactionHistory', transaction);

                saveState();
            }
        }

        const hightlightamount = (e) => {
            e.target.select();
        }

        return { fromplayer, toplayer, amount, players, transact, hightlightamount };
    },
}
</script>