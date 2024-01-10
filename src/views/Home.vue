
<template>
  <Header></Header>
  <div class="row" style="margin-top: 2px;">
    <div class="col-3" id="sidebar" v-if="!sidebar.hidden">
      sidebar
    </div>
    <div class="col" id="main">
      <div class="row">
        <div class="col-4">
          {{ btc?.EUR.code }}
        </div>
        <div class="col-4">
          {{ btc?.GBP.code }}
        </div>
        <div class="col-4">
          {{ btc?.USD.code }}
        </div>
      </div>

      <div class="row">
        <div class="col-4">
          <span v-html="btc?.EUR.symbol"></span> {{ btc?.EUR.rate }}
        </div>
        <div class="col-4">
          <span v-html="btc?.GBP.symbol"></span> {{ btc?.GBP.rate }}
        </div>
        <div class="col-4">
          <span v-html="btc?.USD.symbol"></span> {{ btc?.USD.rate }}
        </div>
      </div>

      <hr>

      <div class="row" style="background-color: silver;">
        <div class="col-md-4 col-sm-6 col-xs-12" v-for="index in 6" :key="index">
          <img :src="`https://picsum.photos/200/300?t=${index}`" width="80%">
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Header from '../views/Header.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'Home',

  components: {
    Header,
  },

  setup(props, context) {
    const sidebar = useSidebarStore();
    const user = useUserStore();
    const btc = ref();
    
    onMounted(async () => {
        const btcData: any = await user.loadbtcData();
        console.log('btcData = ', btcData)
        if (btcData.status === 200) {
          btc.value = btcData.data.bpi;
        } else {
          btc.value = {};
        }
    })

    return {
      sidebar,
      btc
    };
    },
});
</script>
<style>
img {
  padding: 10px;
}
#sidebar {
  margin: auto;
}
</style>