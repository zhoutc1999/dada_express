import router from "./index";
import { getToken } from "@/utils/auth";
import asyncRoutes from "./asyncRouterMap";
import store from "@/store"
router.beforeEach(async(to,from,next)=>{

    const hasToken = getToken();
    if(hasToken){
        await store.dispatch("getRole")
        if(to.path=="/login"){
            next("/")
        }else{
            //筛选出角色对应所拥有的路由表
            let f=asyncRoutes.filter(item=>item.meta.auth.includes(store.state.role))
            //动态添加路由
            if(to.name==null){
                //先添加路由
                for(let i=0;i<f.length;i++){
                    router.addRoute(f[i])
                }
                //因为跳转有可能发生在路由添加成功之前，所以要反复执行
                //参数to找不到对应路由的话，就会再重复执行，直到找到就会执行else
                next({...to,replace:true});
            }else{
                next();
            }
            
        }
    }else{
        if(to.path=="/login"){
            next()
        }else{
            next("/login");
        }
    }
})
