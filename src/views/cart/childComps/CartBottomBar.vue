<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-botton 
      class="check-button" 
      :is-checked='isSlectAll'
      @click.native='checkClick'></check-botton>
      <span>全选</span>
    </div>
    
     <div class="price">
        合计：{{totalPrice}}
      </div>

      <div class="calculate">
        去计算:（{{cheakLength}}）
      </div>
  </div>
</template>

<script>
 import CheckBotton from 'components/content/checkBotton/CheckBotton.vue'
export default {
  components:{
    CheckBotton
  },
  computed:{
    totalPrice(){
      return this.$store.state.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue,item)=>{
        return preValue + item.price*item.count
      },0).toFixed(2)
    },
    cheakLength(){
      return this.$store.state.cartList.filter(item=>item.checked).length
    },
    isSlectAll(){
    //  return !(this.$store.state.cartList.filter(item=>!item.checked).length)
    if(this.$store.state.cartList.length===0){
      return false
    }
    return !this.$store.state.cartList.find(item=>!item.checked)
    }
  },
  methods:{
    checkClick(){
      if(this.isSlectAll){
        // 全部选中
        this.$store.state.cartList.forEach(item=>item.checked=false);
      }else{
        //部分选中或全部不选
         this.$store.state.cartList.forEach(item=>item.checked=true);
      }
    }
  }
}
</script>

<style>
.bottom-bar{
    height: 40px;
    background-color:#eee;
    position: relative;
    line-height: 40px;
    display: flex;
    font-size: 14px;
}
.check-content{
  display: flex ;
 align-items: center;
 margin-left: 10px;
 width: 70px;
}
.check-button{
  /* background-color: red; */
  height: 22px;
  width: 22px;
  line-height: 22px;
  margin-right: 5px;
}
.price{
  margin-left: 30px;
  flex: 1;
}
.calculate{
   width: 90px;
   background-color: red;
  text-align: center;
  color: #eee;
}
</style>