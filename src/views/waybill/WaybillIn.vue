<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row :gutter="20">
                <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="客户单号" prop="start">
                            <el-input v-model="ruleForm.start"></el-input>
                        </el-form-item>
                        <el-form-item label="下单时间" prop="end">
                            <el-input v-model="ruleForm.end"></el-input>
                        </el-form-item>
                        <el-form-item label="货物名称" prop="cargo">
                            <el-input v-model="ruleForm.cargo"></el-input>
                        </el-form-item>
                        <el-form-item label="件数" prop="count">
                            <el-input v-model="ruleForm.count"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="货物单位" prop="unit">
                            <el-input v-model="ruleForm.unit"></el-input>
                        </el-form-item>
                        <el-form-item label="发货地址" prop="price">
                            <el-input v-model="ruleForm.price"></el-input>
                        </el-form-item>
                        <el-form-item label="承运方式" prop="from">
                            <el-radio-group v-model="ruleForm.from">
                                <el-radio label="个人">个人</el-radio>
                                <el-radio label="公司">公司</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="是否急件" prop="pay">
                            <el-radio-group v-model="ruleForm.pay">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        
                    </el-col>
                </el-form>
            </el-row>
            <span>
                <el-button type="primary" @click="save">创建</el-button>
                <el-button @click="close">重置</el-button>
            </span>
        </el-card>
    </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb"
import {post} from "@/utils/http"
import { mapState,mapMutations } from "vuex"
    export default {
        props:["visible"],
        mixins: [breadCrumb],
        data(){
            return {
                title:"新建订单",
                ruleForm:{
                    name:"", //客户名称
                    start:"",
                    end:"",
                    cargo:"",
                    count:"",
                    unit:"",
                    price:"",
                    from:"",
                    pay:"",
                },
                rules:{
                    name:[{required:true,message:"不能为空",trigger:"blur"}],
                    start:[{required:true,message:"不能为空",trigger:"blur"}],
                    end:[{required:true,message:"不能为空",trigger:"blur"}],
                    cargo:[{required:true,message:"不能为空",trigger:"blur"}],
                    count:[{required:true,message:"不能为空",trigger:"blur"},{pattern:/^\d+$/,message:"只能为数字",trigger:"blur"}],
                    unit:[{required:true,message:"不能为空",trigger:"blur"}],
                    price:[{required:true,message:"不能为空",trigger:"blur"}],
                    from:[{required:true,message:"不能为空",trigger:"change"}],
                    pay:[{required:true,message:"不能为空",trigger:"change"}],
                }
            }
            
        },
        methods:{
            ...mapMutations(["clearRow"]),
            close(){
                this.$emit("hide")
                this.$refs.ruleForm.resetFields()
                this.clearRow()
            },
            save(){
                this.$refs.ruleForm.validate((valid)=>{
                    if(valid){
                        post("/addOrder",this.ruleForm).then(()=>{
                            this.$notify({
                                title: '创建成功',
                                type: 'success'
                            });
                            this.close();
                            this.$emit("reload")
                        })
                    }
                })
            }
        },
        computed:{
            ...mapState(["row"])
        }
    }
</script>

<style lang="less" scoped>

</style>