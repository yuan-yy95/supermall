<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" 
      :probe-type='3'
       @scroll='contentScroll'>
           <detail-swiper :top-images='topImage'></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
     <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
      <detail-param-info :paramInfo='paramInfo' ref="param"></detail-param-info>
      <detail-comment-info :comment-info='commentInfo' ref="comment"></detail-comment-info>
      <goods-list :goods='recommends' ref="recommend"></goods-list>
      </scroll>
      <detail-bottom-bar  @addCart="addCart"></detail-bottom-bar>
      <back-top 
      @click.native="backClick"
       v-show="isShowBackTop"></back-top>
       <toast 
       :message='message' 
       :show='show'></toast>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import Toast from 'components/common/toast/Toast.vue'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detai.js'
import {itemListenerMixin,backTopMixin} from '../../commonjs/mixin'


// import {mapActions} from 'vuex'

export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList,
        Toast,
    },
    mixins:[itemListenerMixin,backTopMixin],
data(){
    return {
        iid:null,
        res:null,
        topImage:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        itemImgListener:null,
        themeTopYs:[],
        currentIndex:0,
        message:'',
        show:false
    }
},
created(){
    // 保存iid
    this.iid=this.$route.params.iid

    // 根据iid请求详情数据
     getDetail(this.iid).then(res=>{
         const data=res.data.result

        //  获取顶部图片轮播图
        this.topImage=data.itemInfo.topImages
        // console.log(res.data.result.itemInfo.topImages)

        // 获取商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // console.log(this.goods.columns)

        // 创建店铺信息
        this.shop=new Shop(data.shopInfo)

        // 保存商品信息
        this.detailInfo=data.detailInfo

        // 获取参数信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

        // 读取评论
        if(data.rate.cRate!==0){
            this.commentInfo=data.rate.list[0]
        }
     })

    //  请求推荐数据
    getRecommend().then(res=>{
        this.recommends=res.data.data.list
    })
},
updated(){
//     this.themeTopYs=[]
//  this.themeTopYs.push(0)
//  this.themeTopYs.push(this.$refs.param.$el.offsetTop)
//  this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
//  this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
//  console.log(this.themeTopYs)
},
destroyed(){
    // console.log('123')
    // this.$bus.$off('imageLoad',this.itemImgListener)
},
methods:{
    // ...mapActions(['addCart']),
    imageLoad(){
        // console.log(this.$refs.scroll)
        // this.$refs.scroll.refresh()
        this.refresh()
     this.themeTopYs=[]
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //   console.log(this.themeTopYs)
    },
    titleClick(index){
        // console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){

        // 导航栏联动
        const positionY=-position.y 
        let length=this.themeTopYs.length
        for(let i=0;i<length;i++){
            if(this.currentIndex!==i&&(i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])
                ||this.currentIndex!==i&&(i===length-1&&positionY>=this.themeTopYs[i]))
                {
                    this.currentIndex=i
                    this.$refs.nav.currentIndex=this.currentIndex
            }
       } 
        this.listenShowBackTop(position)

    },
    addCart(){
        // 获取购物车需要展示的东西
        const product={}
        product.image=this.topImage[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.iid=this.iid;
        product.price=this.goods.lowPrice;
         
        // 将商品加到购物车

        // mutation的调用
        // this.$store.commit('addCart',product) 

        // action的调用
        this.$store.dispatch('addCart',product).then(res=>{
           this.show=true;
           this.message=res

           setTimeout(()=>{
               this.show=false;
               this.message=''
           },1500)
        })
        // this.addCart(product).then(res=>{
        //     console.log(res)
        // })
    },
    
}
}
</script>

<style scoped>
#detail{
    position: relative;
    background-color: #fff;
    height: 100vh;
    z-index: 10;
}
.content{
    /* height:100px */
    background-color: #fff;
    height: calc(100% - 93px);
    z-index: 1; 
}
.detail-nav{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index:1;
    background-color: #fff;
}
</style>