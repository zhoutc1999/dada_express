export default [
    {
        path: '/',
        name: 'Layout',
        component:()=>import("../views/LayOut.vue"),
        redirect:"/index",
        children:[
            {
                path: '/index',
                name: 'index',
                component:()=>import("../views/index/HomeIndex.vue"),
            },
            {
                path: '/orders/list',
                name: 'orders_list',
                component:()=>import("../views/orders/OrdersList"),
                meta:{bread:["订单管理","订单列表"]} 
            },
            {
                path: '/waybill/in',
                name: 'waybill_in',
                component:()=>import("../views/waybill/WaybillIn"),
                meta:{bread:["运单管理","运单录入"]} 
            },
            {
                path: '/waybill/list',
                name: 'waybill_list',
                component:()=>import("../views/waybill/WaybillList"),
                meta:{bread:["运单管理","运单列表"],keepAlive:true} 
            },
            {
                path: '/waybill/list/detail',
                name: 'waybill_list_detail',
                component:()=>import("../views/waybill/WaybillDetail"),
                meta:{bread:["运单管理","运单列表","运单详情"]} 
            },
            {
                path: '/depart/data',
                name: 'waybill_list_in',
                component:()=>import("../views/depart/DepartData"),
                meta:{bread:["发车管理","发车数据单"]} 
            },
            {
                path: '/carrier/list',
                name: 'carrier_list',
                component:()=>import("../views/carrier/CarrierList"),
                meta:{bread:["承运商管理","承运商列表"]} 
            },
            {
                path: '/carrier/trucks',
                name: 'carrier_list',
                component:()=>import("../views/carrier/CarrierTrucks"),
                meta:{bread:["承运商管理","车辆列表"]} 
            },
            {
                path: '/carrier/driver',
                name: 'carrier_driver',
                component:()=>import("../views/carrier/CarrierDriver"),
                meta:{bread:["承运商管理","承运司机管理"]} 
            },
            {
                path: '/customer',
                name: 'customer',
                component:()=>import("../views/customer/CustomerManage"),
                meta:{bread:["客户管理"]} 
            },
            {
                path: '/my/info',
                name: 'my_info',
                component:()=>import("../views/my/MyInfo"),
                meta:{bread:["财务管理","客户对账单"]} 
            },
            {
                path: '/my/record',
                name: 'my_record',
                component:()=>import("../views/my/MyRecord"),
                meta:{bread:["财务管理","承运商对账单"]} 
            },
            {
                path: '/my/driver',
                name: 'my_driver',
                component:()=>import("../views/my/MyDriver"),
                meta:{bread:["财务管理","承运司机列表"]} 
            },
            {
                path: '/personal',
                name: 'personal',
                component:()=>import("../views/personal/PersonalCenter"),
                meta:{bread:["个人中心"]} 
            },
            
        ]
    },
    {
        path:'/login',
        name:'Login',
        component:()=>import("../views/LoginVue.vue")
    },
    
]
