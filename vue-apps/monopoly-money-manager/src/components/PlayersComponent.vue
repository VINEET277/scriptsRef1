<template>
    <div class="playersdisplay">
        <div class="playerscards" v-for="(player, index) in players" v-bind:key="index">
            <span class="moneygained">Gained: {{ player.moneygained }} M / </span>
            <span class="moneylost">Lost: {{ player.moneylost }} M / </span>
            <span class="totaltransactions">Transactions: {{ player.totaltransactions }} </span><br/>
            <span class="name">{{ player.name }} </span>
            <span class="money">{{ player.money }} M </span>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const players = computed(() => store.getters.getAllPlayers);

        return { players };
    },
}
</script>