<template>
      <swiper class="detail-swiper">
          <swiper-item 
          v-for="item in topImages"
          class="swiper-item">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    components:{
        Swiper,SwiperItem
        
    },
    props:{
    topImages:{
        type:Array,
        default(){
            return []
        }
    }
},
destroyed(){
}
}
</script>

<style>
.detail-swiper{
height: 300px;
}
</style>