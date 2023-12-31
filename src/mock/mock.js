import Mock from "mockjs";
//模拟网络请求延时
Mock.setup({
    timeout:500
})
//登录接口
//Mock.mock("地址","请求方式","回调函数")
Mock.mock("http://localhost:8080/login","post",(req)=>{
    //请求对象
    const {username,password} =JSON.parse(req.body);
    //根据用户名和密码查询数据库，查询出数据返回给前端
    if(username=="admin"&&password==123456){
        return{
            code:200,
            success:true,
            message:"登录成功",
            token:"asjdoijasoidhasdas",
            //token:令牌（门禁卡）
            nickname:"铁柱",
            role:"administration"
        }
    }else{
        return{
            code:100,
            success:false,
            message:"账号或密码有误"
        }
    }
})
//入职日期接口
Mock.mock("http://localhost:8080/in","get",()=>{
    return {
        code:200,
        success:true,
        message:"请求成功",
        time:"2020-07-01 00:00:00"
    }
})
//菜单接口
const menuList = [
    {
        name:"首页",
        icon:"el-icon-s-home",
        url:"/index",
    },
    {
        name:"订单管理",
        icon:"el-icon-coin",
        url:"/order",
        children:[
            {
                name:"订单列表",
                icon:"el-icon-user",
                url:"/orders/list",
            },
        ]
    },
    {
        name:"运单管理",
        icon:"el-icon-menu",
        url:"/waybill",
        children:[
            {
                name:"运单录入",
                icon:"el-icon-notebook-2",
                url:"/waybill/in",
            },
            {
                name:"运单列表",
                icon:"el-icon-truck",
                url:"/waybill/list",
            },
        ]
    },
    {
        name:"发车管理",
        icon:"el-icon-s-order",
        url:"/depart",
        children:[
            {
                name:"发车数据单",
                icon:"el-icon-tickets",
                url:"/depart/data",
            },
        ]
    },
    {
        name:"承运商管理",
        icon:"el-icon-user",
        url:"/carrier",
        children:[
            {
                name:"承运商列表",
                icon:"el-icon-chat-square",
                url:"/carrier/list",
            },
            {
                name:"车辆列表",
                icon:"el-icon-bank-card",
                url:"/carrier/trucks",
            },
            {
                name:"承运司机列表",
                icon:"el-icon-bank-card",
                url:"/carrier/driver",
            },
        ]
    },
    {
        name:"客户管理",
        icon:"el-icon-chat-dot-square",
        url:"/customer",
    },
    {
        name:"财务管理",
        icon:"el-icon-user",
        url:"/my",
        children:[
            {
                name:"客户对账单",
                icon:"el-icon-chat-square",
                url:"/my/info",
            },
            {
                name:"承运商对账单",
                icon:"el-icon-bank-card",
                url:"/my/record",
            },
            {
                name:"承运司机管理",
                icon:"el-icon-bank-card",
                url:"/my/driver",
            },
        ]
    },
    {
        name:"个人中心",
        icon:"el-icon-user",
        url:"/personal",
    }
]
Mock.mock("http://localhost:8080/menu","get",()=>{
    return {
        code:200,
        success:true,
        message:"请求成功",
        data:menuList,
    }
})
//折线图图表接口
Mock.mock("http://localhost:8080/line","get",()=>{
    return {
        code:200,
        success:true,
        message:"请求成功",
        data:{
            "1月":8400,
            "2月":4000,
            "3月":5600,
            "4月":7000,
            "5月":6100,
            "6月":9000,
            "7月":6780,
            "8月":5675,
            "9月":8000,
            "10月":7680,
            "11月":9000,
            "12月":9800,
        }
    }
})
//订单管理-订单列表
Mock.mock("http://localhost:8080/orderList",'post',(req)=>{
    const {page,pageSize,keyword}=JSON.parse(req.body);
    console.log("接口接收到参数：",page,pageSize,keyword)
    return{
        code:200,
        success:true,
        message:"请求成功",
        data: Mock.mock({
            [`list|${pageSize}`]:[{
                'id|+1':10000,//订单号
                'status|1':[1,2,3,4],//订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                'date':Mock.Random.date(),//下单时间
                'name|1':["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],
                'start':Mock.Random.city(true),//起始城市
                'end':Mock.Random.city(true),//目的城市
                'cargo|1':["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count':Mock.Random.integer(10,200),//件数
                'unit|1':["方","顿"],//单位
                'price':Mock.Random.integer(5000,50000),//运费
                'from|1':["移动端","pc端"],
                'pay|1':[1,2],//是否支付 1已支付 2未支付
            }],
            "total":47
        })
    }
})
//订单管理-新建订单
Mock.mock("http://localhost:8080/addOrder",'post',(req)=>{
    const {name,start,end,cargo,count,unit,price,from,pay}=JSON.parse(req.body)
    console.log("新建订单接口收到参数:"+name,start,end,cargo,count,unit,price,from,pay)
    return{
        code:200,
        success:true,
        message:"新建成功",
    }
})
//运单管理-运单列表
Mock.mock("http://localhost:8080/waybillList",'post',(req)=>{
    const {page,pageSize,waybillNo,name,startDate,endDate,status}=JSON.parse(req.body);
    console.log("服务端接收到参数：",page,pageSize,waybillNo,name,startDate,endDate,status)
    return{
        code:200,
        success:true,
        message:"请求成功",
        data: Mock.mock({
            [`list|${pageSize}`]:[{
                'no|+1':10000,//订单号
                'date':Mock.Random.date(),//下单时间
                'name|1':["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],
                'cargo|1':["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count':Mock.Random.integer(10,200),//件数
                'start':Mock.Random.city(true),//起始城市
                'end':Mock.Random.city(true),//目的城市
                'price':Mock.Random.integer(5000,50000),//运费
                'needRecive|1':[1,2], //需要接货 1需要 2不需要
                'plateNumber|1':["京A12345","苏C66666","鲁B45678"],//车牌号
                'driver':Mock.Random.cname(),
                'tel|1':[18888888888,1352568531,15423568467,13215235621],
                'percent|1':[37,22,89,65,80,74,56],//是否支付 1已支付 2未支付
            }],
            "total":47
        })
    }
})
//承运商管理
Mock.mock("http://localhost:8080/carrier",'post',(req)=>{
    const {page,pageSize}=JSON.parse(req.body);
    console.log("接口接收到参数：",page,pageSize)
    return{
        code:200,
        success:true,
        message:"请求成功",
        data: Mock.mock({
            [`list|${pageSize}`]:[{
                'no|+1':20512131231,//订单号
                'name|1':["诺来科技","辉华股份","川聚物流","成越材料","聚博纺织"],
                'licence':"D"+Mock.Random.integer(213145123,999999999),
                'tel|1':["张三/18298120311","李四/13452120311","王五/18298120311","老八/1348120311","汉堡/15287912411"],
                'class|1':["自有车","公司车"],
                'time':Mock.Random.date(),
                'carrierName|1':["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],
                'code':"无",
                'address':Mock.Random.city(true),
                'report|1':["是","否"],
                'number':Mock.Random.integer(60,100),
            }],
            "total":47
        })
    }
})
//客户管理
Mock.mock("http://localhost:8080/customer",'post',(req)=>{
    const {page,pageSize}=JSON.parse(req.body);
    console.log("接口接收到参数：",page,pageSize)
    return{
        code:200,
        success:true,
        message:"请求成功",
        data: Mock.mock({
            [`list|${pageSize}`]:[{
                'no|+1':10000,//订单号
                'name|1':["诺来科技","辉华股份","川聚物流","成越材料","聚博纺织"],
                'company|1':["诺来科技有限公司","辉华股份有限公司","川聚物流有限公司","成越材料有限公司","聚博纺织有限公司"],
                'business|1':["日用品","纺织品","生鲜","建材","电器"],//货物名称
                'count':Mock.Random.integer(1023,200123),//件数
                'status|1':[1,2,3,4],//订单状态 1待审核 2已审核 3审核通过 4审核拒绝
                'mileage':Mock.Random.integer(1023,200123),//件数
                'people|1':["周先生","刘先生","王先生","陈先生","黄先生"],
                'tel':Mock.Random.integer(10000000000,19000000000),//件数
                'address':Mock.Random.city(true),//起始城市
                'number':Mock.Random.integer(10000000000,99999999999),//件数
            }],
            "total":47
        })
    }
})
//客户对账单
Mock.mock("http://localhost:8080/myInfo",'post',(req)=>{
    const {page,pageSize}=JSON.parse(req.body);
    console.log("接口接收到参数：",page,pageSize)
    return{
        code:200,
        success:true,
        message:"请求成功",
        data: Mock.mock({
            [`list|${pageSize}`]:[{
                'no|+1':20512131231,//订单号
                'name|1':["诺来科技","辉华股份","川聚物流","成越材料","聚博纺织"],
                'date':Mock.Random.date(),
                'people|1':["周先生","刘先生","王先生","陈先生","黄先生"],
                'myStatus|1':[1,2],
                'billStatus|1':[1,2],
                'count':Mock.Random.integer(1023,200123),//件数
                'errStatus|1':[1,2],
                'createDate':Mock.Random.date(),
                'creator|1':["周先生","刘先生","王先生","陈先生","黄先生"],
            }],
            "total":47
        })
    }
})

//根据token获取权限名字
Mock.mock("http://localhost:8080/getRole",'get',()=>{
    return{
        code:200,
        success:true,
        message:"请求成功",
        role:"user"
    }
})