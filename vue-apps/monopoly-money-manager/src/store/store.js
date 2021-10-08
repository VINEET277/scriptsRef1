import { createStore } from 'vuex'

export default createStore({
    state: {
        initialMoney: 15,
        players: {},
        transactionsHistory: [],
        savedGame: false,
    },
    getters: {
        getInitialMoney(state){
            return state.initialMoney;
        },
        getAllPlayers(state){
            return state.players;
        },
        getTransactionsHistory(state){
            return state.transactionsHistory;
        },
        getGameStateJSONStr(state){
            return JSON.stringify(state);
        },
        getSavedGameStatus(state){
            return state.savedGame;
        },
    },
    mutations: {
        addPlayer(state, playerObj){
            state.players = {
                ...state.players, 
                [playerObj.name]: playerObj
            };
        },
        transactMoney(state, transactObj){
            let fromplayer = transactObj.fromplayer;
            let toplayer = transactObj.toplayer;
            let amount = transactObj.amount;

            if(fromplayer != 'Bank') {
                let tempMoney = (parseFloat(state.players[fromplayer].money) - parseFloat(amount)).toFixed(4);
                state.players[fromplayer].money = tempMoney;
                state.players[fromplayer].totaltransactions++;
            }
            if(toplayer != 'Bank'){
                let tempMoney = (parseFloat(state.players[toplayer].money) + parseFloat(amount)).toFixed(4);
                state.players[toplayer].money = tempMoney;
                state.players[toplayer].totaltransactions++;
            }

            if(fromplayer != 'Bank'){
                let tempMoney = (parseFloat(state.players[fromplayer].moneylost) - parseFloat(amount)).toFixed(4);
                state.players[fromplayer].moneylost = tempMoney;
            }

            if(toplayer != 'Bank'){
                let tempMoney = (parseFloat(state.players[toplayer].moneygained) + parseFloat(amount)).toFixed(4);
                state.players[toplayer].moneygained = tempMoney;
            }
        },
        addToTransactionHistory(state, transaction){
            state.transactionsHistory = [ transaction, ...state.transactionsHistory ];
        },
        setStoreState(state, storeStateJSONStr){
            let stateFromSnap = JSON.parse(storeStateJSONStr);
            state.initialMoney = stateFromSnap.initialMoney;
            state.players = stateFromSnap.players;
            state.transactionsHistory = stateFromSnap.transactionsHistory;
        },
        setSavedGameStatus(state, status){
            state.savedGame = status;
        },
    },
    actions: {
        addPlayer(context, playerObj){
            context.commit('addPlayer', playerObj)
        },
        transactMoney(context, transactObj){
            context.commit('transactMoney', transactObj)
        },
        addToTransactionHistory(context, transaction){
            context.commit('addToTransactionHistory', transaction)
        },
        setStoreState(context, storeStateJSONStr){
            context.commit('setStoreState', storeStateJSONStr)
        },
        setSavedGameStatus(context, status){
            context.commit('setSavedGameStatus', status)
        },
    },
    modules: {
    }
  })