<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="12" class="info tl">
                    <span class="mr">运单编号:YT438912312378</span>
                    <span class="mr">创建时间:2022-08-24</span>
                    <span>审核员:张三丰</span>
                </el-col>
                <el-col :span="12" class="info tr">
                    <el-button type="primary" @click="back">返回</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-steps :active="2" align-center>
            <el-step title="未发货"></el-step>
            <el-step title="运输中"></el-step>
            <el-step title="已收货"></el-step>
            <el-step title="已完成"></el-step>
            </el-steps>
        </el-card>
    </div>
</template>

<script>
/*
include:包含
exclude:排除
    <keep-alive include="组件名" exclude="组件名">
    </keep-alive>
*/
import breadCrumb from "@/mixins/breadCrumb"
import { mapMutations } from "vuex"
    export default {
        beforeRouteLeave(to,from,next){
            if(to.path=="/waybill/list"){
                //做标记
                this.changeIsFromDetail(true)
            }else{
                this.changeIsFromDetail(false)
            }
            next()
        },
        mixins: [breadCrumb],
        methods:{
            ...mapMutations(["changeIsFromDetail"]),
            back(){
                this.$router.push("/waybill/list")
            }
        }
    }
</script>

<style lang="less" scoped>

</style>