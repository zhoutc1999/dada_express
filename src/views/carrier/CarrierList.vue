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
                <el-table-column prop="no" label="编号id"></el-table-column>
                <el-table-column prop="name" label="简称"></el-table-column>
                <el-table-column prop="licence" label="道路许可证"></el-table-column>
                <el-table-column prop="tel" label="联系人/电话"></el-table-column>
                <el-table-column prop="class" label="类型"></el-table-column>
                <el-table-column prop="time" label="注册时间" ></el-table-column>
                <el-table-column prop="carrierName" label="承运商名称"></el-table-column>
                <el-table-column prop="code" label="信用代码"></el-table-column>
                <el-table-column prop="address" label="注册地址"></el-table-column>
                <el-table-column prop="report" label="是否上报"></el-table-column>
                <el-table-column prop="number" label="信用分"></el-table-column>
                <el-table-column label="操作" width="180">
                    <el-button size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
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
                const res = await post("/carrier", this.pageData);
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