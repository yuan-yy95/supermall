import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
import {BACKTOP_DISTANCE} from '../commonjs/const'

export const itemListenerMixin={
    data(){
        return {
            // refresh:null
        }
    },
    mounted(){
     this.refresh= debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener=()=>{
        this.refresh()
    }
    this.$bus.$on('imageLoad',this.itemImgListener)
    }
}

export const backTopMixin={
    components:{
        BackTop
    },
    data(){
       return {
        isShowBackTop:false
       }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0,300)
        },
        listenShowBackTop(position){
            this.isShowBackTop=(-position.y)>BACKTOP_DISTANCE
        }
    }
}