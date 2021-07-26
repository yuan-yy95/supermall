<template>
<div class="cart">
  <nav-bar class="nav-bar">
     <div slot="center">购物车({{cartLength}})</div>
     </nav-bar>
     <scroll class="content" ref="scroll">
        <cart-list></cart-list>
       </scroll>
      <car-bottom-bar></car-bottom-bar>
</div>
</template>

<script>
import NavBar from  'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import { mapGetters } from 'vuex'

import CartList from './childComps/cartList.vue'
import CarBottomBar from './childComps/CartBottomBar.vue'

export default {
  name:'Cart',
components:{
  NavBar,
  Scroll,
  CartList,
  CarBottomBar
},
methods:{
  btn(){
    this.$refs.a.scroll.scrollTo(0,0)
  },
},
  computed:{
   ...mapGetters([
      'cartLength'
    ])
  },
  activated(){
this.$refs.scroll.refresh()
}
}
</script>

<style scoped>
.cart{
  height: 100vh;
  position: relative;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}
.content{
    /* height:100px */
    background-color: #fff;
    height: calc(100% - 133px);
    z-index: 1; 
    overflow: hidden;
}
</style>