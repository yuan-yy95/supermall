export default{
    addCart(context,payload){
        //    查找数组是否有该商品方法1
        // let oldProduct=null;
        //    for(let item of state.cartList){
        //        if(item.iid===payload.iid){
        //         oldProduct=item
        //        }
        //    } 

        //    查找数组是否有该商品方法2
        return new Promise((resolve,reject)=>{
            let oldProduct=context.state.cartList.find(item =>item.iid===payload.iid)
          
            if(oldProduct){
                context.commit('addCounter',oldProduct)
                resolve('加购')
               }
               else{
                payload.count=1
                context.commit('addCart',payload)
                resolve('加购新的')

               }
        })
    }
}