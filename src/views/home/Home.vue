<template>
<div id="home">
<nav-bar class="home-nav">
      <div slot="center">购物街</div>
  </nav-bar>
   <tab-control 
  :tittle="['流行','新品','精选']"
  @tabClick='tabClick'
  ref="tabControl1"
  class="tab-control1"
 v-show="isTabFixed"
  ></tab-control>
  <scroll class="content" ref="scroll" 
  :probe-type='3' 
  :pull-up-load='true'
  @scroll='contentScroll'
  @pullingUp='loadMore'>
 <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>
  <home-recommend :recommends="recommends"></home-recommend>
  <home-feature></home-feature>
  <tab-control 
  :tittle="['流行','新品','精选']"
  @tabClick='tabClick'
  ref="tabControl2"
  ></tab-control>
  <goods-list :goods='showGoods'></goods-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import NavBar from  'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll.vue'

import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommend from './childComps/HomeRecommend.vue'
import HomeFeature from './childComps/HomeFeature.vue'

import {
    getHomeMultidata,
    getHomeGoods
    } from 'network/home'

import {itemListenerMixin,backTopMixin} from '../../commonjs/mixin'

export default {
components:{
    NavBar,
    TabControl,
    Scroll,
    GoodsList,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
},
mixins:[itemListenerMixin,backTopMixin],
data(){
return{
    banners:[],
    recommends:[],
    goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
    },
    currentType:'pop',
    tabOffsetTop:0,
    isTabFixed:false,
    saveY:0,
    itemImgListener:null,
}
},
computed:{
showGoods(){
    return this.goods[this.currentType].list

}
},
created(){
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    },
mounted(){
    //防抖

},
activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
},
deactivated(){
    this.saveY= this.$refs.scroll.getScrollY()
    this.$bus.$off('ItemImageLoad',this.itemImgListener)
//  console.log(this.$refs.scroll.scroll.y)
//  console.log( this.$refs.scroll.getScrollY())

},
methods:{
    // 网络请求
    getHomeMultidata(){
         getHomeMultidata().then(res=>{
        this.banners=res.data.data.banner.list
        this.recommends=res.data.data.recommend.list
    })
    },
    getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      },

    //   事件监听
    tabClick(index){
        switch(index){
            case 0:
                this.currentType='pop'
                break
            case 1:
                this.currentType='new'
                break
            case 2:
                this.currentType='sell'
                break
        }
        if(this.$refs.tabControl1!=undefined){
             this.$refs.tabControl2.currentType=index
         this.$refs.tabControl1.currentType=index
        }
        
        // console.log( this.$refs.tabControl2.currentType)
        //  console.log( this.$refs.tabControl1.currentType)
        // this.$refs.tabControl1.currentType=inde x
        // this.$refs.tabControl2.currentType=index
    },
    
    contentScroll(position){
        // 判断是否显示
    this.listenShowBackTop(position)

    // 判断是否吸顶
    // this.isTabFixed=(-position.y)>666
    this.isTabFixed=(-position.y)>this.tabOffsetTop
    // console.log((-position.y)>666)
    // console.log(this.tabOffsetTop)
    },
    loadMore(){
        this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
    // console.log(this.$refs.tabControl2.$el.offsetTop)
     this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
     this.refresh()
    }
}
}
</script>

<style scoped>
#home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
}
.home-nav{
   background-color: var(--color-tint);
   color: white;
   position: fixed;
   left: 0;
   right: 0;
   bottom: 0;
   top: 0;
   /* z-index: 9; */
}
.tab-control1{
    position: fixed;
   left: 0;
   right: 0;
   bottom: 0;
   top: 44px;
    /* top: 44px; */
    z-index: 9;
}
.content{
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
}
</style>