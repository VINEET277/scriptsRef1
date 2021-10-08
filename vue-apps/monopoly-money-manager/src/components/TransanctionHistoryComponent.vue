<template>
    <div class="transactionhistory">
        <button v-on:click="restorestate">Restore State</button>
        <button v-on:click="clearstate">Clear State</button>
        <span>{{ savedgamestatus }}</span>
        <div class="transactioncards" v-for="(transaction, index) in transactions" v-bind:key="index">
            {{ transaction }}
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const savedgamestatus = computed(() => store.getters.getSavedGameStatus ? 'Previous Saved Game Available' : 'No Saved Game Found');

        const checkSavedGameStatus = () => {
            let storeStateJSONStr = window.localStorage.getItem('lastmonopolygame');
            if(storeStateJSONStr != null && storeStateJSONStr != undefined && storeStateJSONStr != ''){
                store.dispatch('setSavedGameStatus', true);
            }
        }

        onMounted(checkSavedGameStatus);

        const transactions = computed(() => store.getters.getTransactionsHistory);

        const restorestate = () => {
            let storeStateJSONStr = window.localStorage.getItem('lastmonopolygame');
            // console.log('json', storeStateJSONStr);

            if(storeStateJSONStr != null && storeStateJSONStr != undefined && storeStateJSONStr != ''){
                store.dispatch('setStoreState', storeStateJSONStr);
                store.dispatch('addToTransactionHistory', (new Date()).toLocaleTimeString() + ' > Restored Snapshot');
            }
        }

        const clearstate = () => {
            window.localStorage.removeItem('lastmonopolygame');
            store.dispatch('addToTransactionHistory', (new Date()).toLocaleTimeString() + ' > Cleared Snapshot');
            store.dispatch('setSavedGameStatus', false);
        }

        return { restorestate, clearstate, savedgamestatus, transactions };
    },
}
</script>