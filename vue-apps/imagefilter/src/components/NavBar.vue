<template>
    <div class="navbarcontainer">
        <div class="navbar">
            <span class="logo">
                Image Filter
            </span>

            <span class="filters">
                <select v-on:change="routeChange">
                    <option disabled value="">Select Filter</option>
                    <option v-for="(route, index) in availableRoutes" v-bind:value="route.path" v-bind:key="index">{{ route.name }}</option>
                </select>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import './NavBar.scss';

export default defineComponent({
    setup() {
        const route = useRouter();
    
        const availableRoutes = route.getRoutes();
        console.log(availableRoutes);

        const routeChange = (e: any) => {
            route.push({
                path: e.target.value
            });
            
        };

        return { availableRoutes, routeChange };
    },
})
</script>
