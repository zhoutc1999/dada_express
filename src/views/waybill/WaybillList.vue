<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row :gutter="16">
                <el-col :span="6">
                    <el-input placeholder="请输入运单号" v-model="params.waybillNo"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入客户名称" v-model="params.name"></el-input>
                </el-col>
                <el-col :span="6">
                    <div class="block">
                        <el-date-picker
                        v-model="date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width: 100%;"
                        >
                        </el-date-picker>
                    </div>
                </el-col>
                <el-col :span="6" class="tr">
                    <el-button type="primary" @click="loadData">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-radio-group v-model="params.status" @change="loadData">
                <el-radio-button label="1">全部运单(300)</el-radio-button>
                <el-radio-button label="2">装货中(120)</el-radio-button>
                <el-radio-button label="3">运输中(70)</el-radio-button>
                <el-radio-button label="4">已完成(100)</el-radio-button>
                <el-radio-button label="5">运单异常(10)</el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="no" label="运单号"></el-table-column>
                <el-table-column prop="date" label="下单时间"></el-table-column>
                <el-table-column prop="name" label="客户名称"></el-table-column>
                <el-table-column prop="cargo" label="货物名称"></el-table-column>
                <el-table-column prop="count" label="件数"></el-table-column>
                <el-table-column prop="start" label="起始城市" ></el-table-column>
                <el-table-column prop="end" label="目的城市"></el-table-column>
                <el-table-column prop="price" label="运费"></el-table-column>
                <el-table-column prop="needRecive" label="需要接货"></el-table-column>
                <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
                <el-table-column prop="driver" label="司机"></el-table-column>
                <el-table-column prop="tel" label="司机电话"></el-table-column>  
                <el-table-column prop="percent" label="运输进度">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.percent"></el-progress>
                    </template>
                </el-table-column>
                <el-table-column prop="percent" label="运输进度" width="180px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="detail(scope.row.no)">详情</el-button>
                        <el-button size="mini" type="danger">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="mt fr mb" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="pageData.page" :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
/*
<keep-alive>
    1.可以是component
    2.router-view
</keep-alive>
*/

import breadCrumb from "@/mixins/breadCrumb"
import moment from "moment"
import {post} from "@/utils/http"
import { mapState } from "vuex"
import { mapMutations } from "vuex"
    export default {
        mixins: [breadCrumb],
        data(){
            return{
                loading: false,
                status:1,
                tableData:[],
                total: 0,
                params:{
                    waybillNo:"",
                    name:"",
                    status:1
                },
                date:[],
                pageData:{
                    page:1,
                    pageSize:10,
                }
            }
        },
        computed:mapState(["isFromDetail"]),
        created(){
            this.loadData()
        },

        activated(){
            //如果你上次是从详情页直接去的其他页面，主动加载一次数据
            //如果不是从详情页过来的
            if(!this.isFromDetail){
                this.loadData();
            }
        },
        deactivated(){
            console.log("失活时使用")
        },
        beforeRouteLeave(to,from,next){
            if(to.path=="/waybill/list/detail"){
                from.meta.keepAlive=true
            }else{
                this.clearCache()
                //this.changeIsFromDetail(false)
            }
            next()
        },

        methods:{
            ...mapMutations(["changeIsFromDetail"]),
            async loadData(){
                this.loading = true
                let startDate=this.date[0]?moment(this.date[0]).format("YYYY-MM-DD"):""
                let endDate=this.date[1]?moment(this.date[1]).format("YYYY-MM-DD"):""
                console.log(startDate)
                console.log(endDate)

                const res=await post("/waybillList",{...this.pageData,...this.params,startDate,endDate})
                this.tableData=res.data.list
                this.loading = false
                this.total=res.data.total
            },
            handleSizeChange(pageSize) {
                this.params.pageSize = pageSize;
                this.loadData()
            },
            handleCurrentChange(page) {
                this.params.page = page;
                this.loadData()
            },
            detail(no){
                this.$router.push("/waybill/list/detail?no="+no)
            },
            clearCache(){
                //如果去的不是详情页，就要清除缓存
                //网上找到清缓存的方法 vue没有
                let vnode =this.$vnode;
                let parentVnode=vnode && vnode.parent;
                if(
                    parentVnode &&
                    parentVnode.componentInstance &&
                    parentVnode.componentInstance.cache
                ){
                    var key=
                        vnode.key == null
                        ? vnode.componentOptions.Ctor.cid +
                        (vnode.componentOptions.tag
                        ? `::${vnode.componentOptions.tag}`
                        : "")
                        :vnode.key;
                    var cache = parentVnode.componentInstance.cache;
                    var keys = parentVnode.componentInstance.keys;
                    if(cache[key]){
                        this.$destroy();
                        //remove key
                        if (keys.length){
                            var index =keys.indexOf(key);
                            if(index > -1){
                                keys.splice(index,1)
                            }
                        }
                        cache[key]=null;
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>