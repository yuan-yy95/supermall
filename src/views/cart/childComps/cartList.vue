<template>
    <div class="cart-list">
    <cart-list-item
     v-for="(item,index) in cartList" 
     :key='index' 
     :product='item'></cart-list-item>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'

import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem.vue'

export default {
name:'CartList',
components:{
Scroll,
CartListItem
},
computed:{
     ...mapGetters(['cartList'])
},
}
</script>

<style scoped>

</style>