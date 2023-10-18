export default{
    data(){
        return{
            breadList:[]
        }
    },
    created(){
        this.getBreadCrumb()
    },
    watch:{
        //params query
        //data 计算属性 props $route 也能监听
        $route(){
            this.getBreadCrumb()
        }
    },
    methods:{
        getBreadCrumb(){
            this.breadList=this.$route.meta.bread||[]
        }
    }
}