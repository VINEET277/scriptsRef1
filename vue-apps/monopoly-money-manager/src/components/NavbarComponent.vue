<template>
    <div class="navbar">
        <div class="logo">
            <img class="logo" alt="Vue logo" src="../assets/logo.png">
        </div>
        <div class="title">
            Monopoly<br/>
            Money Manager
        </div>
        <div class="addPlayer">
            <button v-on:click="addPlayer"><span class="plus">+</span><br/> Add Player</button>
        </div>
        <div class="playernamemodal">
            <div v-show="playernamemodal">
                <input type="text" v-model="playername" size="10" placeholder="Player Name"/>
                <input type="number" v-model="initialMoney" size="10" placeholder="Initial Money"/>
                <button v-on:click="pushPlayer">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const initialMoney = ref(15);
        const playernamemodal = ref(false);
        const playername = ref('');

        const addPlayer = () => {
            console.log('starting to add player')
            playernamemodal.value = true;
            playername.value = '';
        }

        const pushPlayer = () => {
            playernamemodal.value = false;

            let playerObj = {
                name: playername.value,
                money: parseFloat(initialMoney.value).toFixed(4),
                moneygained: 0,
                moneylost: 0,
                totaltransactions: 0
            };
            console.log(playerObj);

            store.dispatch('addPlayer', playerObj);
        }

        return { initialMoney, playernamemodal, playername, addPlayer, pushPlayer }
    },
}
</script>