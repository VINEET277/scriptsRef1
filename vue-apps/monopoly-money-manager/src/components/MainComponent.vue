<template>
    <div>
        <NavbarComponent />
        <PlayersComponent />
        <TransactComponent />
        <TransanctionHistoryComponent />
    </div>
</template>

<script>
import NavbarComponent from './NavbarComponent.vue';
import PlayersComponent from './PlayersComponent.vue';
import TransactComponent from './TransactComponent.vue';
import TransanctionHistoryComponent from './TransanctionHistoryComponent.vue';

export default {
    components: {
        NavbarComponent, PlayersComponent, TransactComponent, TransanctionHistoryComponent
    },
    setup() {
        
    },
}
</script>