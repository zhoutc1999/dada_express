<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row :gutter="16">
                <el-col :span="6">
                    <el-input placeholder="请输入运单号"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入客户名称"></el-input>
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
import breadCrumb from "@/mixins/breadCrumb"
import { post } from "@/utils/http"

    export default {
        mixins: [breadCrumb],
        data() {
            return {
                tableData:[],
                loading: false,
                total: 0,
                pageData:{
                    page:1,
                    pageSize:10,
                },
                date:[],
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            async loadData() {
                this.loading = true
                const res = await post("/customer", this.pageData);
                this.tableData = res.data.list
                this.loading = false,
                this.total = res.data.total
            },
            handleSizeChange(pageSize) {
                this.pageData.pageSize = pageSize;
                this.loadData()
            },
            handleCurrentChange(page) {
                this.pageData.page = page;
                this.loadData()
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>