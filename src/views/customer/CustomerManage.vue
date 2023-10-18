<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row :gutter="24">
                <el-col :span="18">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <el-input placeholder="用户昵称"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="客户ID"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="联系电话"></el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24" class="mt" v-show="show">
                        <el-col :span="8">
                            <el-input placeholder="所属公司"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="公司地址"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-input placeholder="银行卡号"></el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="2">
                    <span class="el-dropdown-link" @click="expand">
                        {{ show?"收起":"展开" }}<i :class="`el-icon-arrow-${show?'up':'down'} el-icon--right`"></i>
                    </span>
                </el-col>
                <el-col :span="4" class="tr">
                    <el-button type="primary" @click="loadData">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-row>
                <el-col>
                    <el-button type="primary">添加客户</el-button>
                    <el-button type="primary">批量导入</el-button>
                    <el-button type="primary">导入模版下载</el-button>
                    <el-button type="primary">导出客户</el-button>
                    <el-button type="warning">分配</el-button>
                    <el-button type="warning">查看地图</el-button>
                    <el-button type="warning">+ 新增</el-button>
                    <el-button icon="el-icon-delete" type="danger" class="fr">删除</el-button>
                    <el-button icon="el-icon-edit" class="fr">修改</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="no" label="id"></el-table-column>
                <el-table-column prop="name" label="用户昵称"></el-table-column>
                <el-table-column prop="company" label="所属公司"></el-table-column>
                <el-table-column prop="business" label="主营业务"></el-table-column>
                <el-table-column prop="count" label="账户余额"></el-table-column>
                <el-table-column prop="status" label="认证状态" ></el-table-column>
                <el-table-column prop="mileage" label="运输里程数"></el-table-column>
                <el-table-column prop="people" label="联系人"></el-table-column>
                <el-table-column prop="tel" label="电话"></el-table-column>
                <el-table-column prop="address" label="公司地址"></el-table-column>
                <el-table-column prop="number" label="银行卡号"></el-table-column>
                <el-table-column label="操作" width="100">
                    <el-button type="primary" size="mini">详情</el-button>
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
import { post } from "@/utils/http"
import breadCrumb from "@/mixins/breadCrumb"
    export default {
        mixins: [breadCrumb],
        data(){
            return{
                show:false,
                tableData:[],
                loading: false,
                total: 0,
                pageData:{
                    page:1,
                    pageSize:10,
                }
            }
        },
        created() {
            this.loadData()
        },
        methods:{
            expand(){
                this.show=!this.show
            }, 
            async loadData(){
                this.loading = true
                const res = await post("/customer", this.pageData);
                this.tableData=res.data.list
                this.loading = false
                this.total=res.data.total
            },
            handleSizeChange(pageSize) {
                this.pageData.pageSize = pageSize;
                this.loadData()
            },
            handleCurrentChange(page) {
                this.pageData.page = page;
                this.loadData()
            },
        }
    }
</script>

<style lang="less" scoped>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 18px;
    }
</style>