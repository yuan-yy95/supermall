<template>
  <div class="goodsItem" @click="itemClivk">
     <img  v-lazy='showImage' alt="" @load="imageLoad"> 
     <div class="goods-info">
         <p>{{goodsItem.title}}</p>
         <span class="price">价格：{{goodsItem.price}}</span>
         <span class="cfav">收藏：{{goodsItem.cfav}}</span>
     </div>
  </div>
</template>

<script>
export default {
props:{
    goodsItem:{
        type:Object,
        default(){
            return {}
        }
    }
},
computed:{
  showImage(){
    return this.goodsItem.image||this.goodsItem.show.img
  }
},
methods:{
  imageLoad(){
    this.$bus.$emit('ItemImageLoad')
  },
  itemClivk(){
    this.$router.push('/detail/'+this.goodsItem.iid)
    // console.log(this.goodsItem.iid)
  }
}
}
</script>

<style>
 .goodsItem {
    padding-bottom: 40px;
    position: relative;
    width: 45%;
  }
  .goodsItem img {
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
     background: url("../../../assets/img/common/collect.png") 0 0/14px 14px;
    /* background: url("~assets/img/common/collect.svg") 0 0/14px 14px; */
  }
</style>