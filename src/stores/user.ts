// @ts-check
import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

/**
 * Simulate a login
 */
function apiLoginFake() {
    return axios
        .get('https://randomuser.me/api/')
        .then(response => {
            return {status: response.status, data: response.data};
        })
}
function apiLoadData() {
    return axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => {
            return {status: response.status, data: response.data};
        })
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    result: {},
    data: [],
    btcData: [],
  }),

  actions: {
    async fakeLogin() {
        const userData = await apiLoginFake()
        console.log(userData)
        if (userData.status === 200) {
            this.$state.data = userData.data
            this.$state.result = userData.data.results[0];
            return userData
        } else {
            return [];
        }
      },

    async loadbtcData() {
        const btcData = await apiLoadData();
        console.log(btcData)
        if (btcData.status === 200) {
            this.$state.btcData = btcData.data
            return btcData
        } else {
            return [];
        }

    },

    async logout() {
        this.$state.data = []
        this.$state.result = {}
        return this.$state;
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
