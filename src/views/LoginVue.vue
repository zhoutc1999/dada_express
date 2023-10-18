<template>
    <div>
        <el-row type="flex" justify="center" >
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>达达货运管理系统</h2>
                </div>
                <el-form 
                    :model="ruleForm" 
                    :rules="rules" 
                    ref="ruleForm" 
                    label-width="80px" 
                    class="demo-ruleForm"
                >
                    <el-form-item label="用户名:" prop="username">
                        <el-input v-model.trim="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                        <el-input type="password" v-model.trim="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%;" @click="login" :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import {post} from "@/utils/http"
import {setToken} from "@/utils/auth"
import { mapMutations } from "vuex"
    export default {
        data() {
            return {
                loading:false,
                ruleForm: {
                    username: '',
                    password:'',

                },
                rules: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                        //{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                        {pattern: /^\w{4,8}$/ ,message:'用户面要求是4到8位纯数字',trigger:'blur'}
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        {pattern: /^\d{6}$/ ,message:'密码要求是6位纯数字',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            ...mapMutations(["setRole"]),
            login() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        this.loading=true
                        //登录逻辑
                        post("/login",this.ruleForm).then(res=>{
                            //动态增加路由表,刷新就丢失
                            this.loading=false
                            setToken(res.token);
                            this.setRole(res.setRole);
                            sessionStorage.setItem("nickname",res.nickname);
                            this.$router.push("/")
                            
                        }).catch((error)=>{
                            this.loading=false
                            console.log(error)
                        })

                    }
                });
            },
             
        }


    }
</script>

<style lang="less" scoped>
//less 加强版的css less不是合法的，需要编译成css才能使用
//mock 模拟数据生成接口
@bgColor:#5696ff;
@width:800px;
.box-card{
        width: 500px;
        margin-top: (400/2px);
    h2{
        text-align: center;
        color: @bgColor;
    }
}
</style>