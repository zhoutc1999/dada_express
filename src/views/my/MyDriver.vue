<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row :gutter="16">
                <el-col :span="6">
                    <el-input placeholder="承运司机名称"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="创建时间"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="账单状态"></el-input>
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
                <el-table-column prop="no" label="对账单号"></el-table-column>
                <el-table-column prop="date" label="账单时间"></el-table-column>
                <el-table-column prop="people" label="付款对象"></el-table-column>
                <el-table-column prop="myStatus" label="账单状态" >
                    <template slot-scope="scope">
                        {{ scope.row.myStatus==1?"已对账":(scope.row.myStatus==2?"核对中":"未对账") }}
                    </template>
                </el-table-column>
                <el-table-column prop="billStatus" label="开票状态" >
                    <template slot-scope="scope">
                        {{ scope.row.billStatus==1?"已开票":"未开票" }}
                    </template>  
                </el-table-column>
                <el-table-column prop="count" label="总支出金额"></el-table-column>
                <el-table-column prop="errStatus" label="异常状态" >
                    <template slot-scope="scope">
                        {{ scope.row.errStatus==1?"否":"否" }}
                    </template>
                </el-table-column>
                <el-table-column prop="createDate" label="创建时间" ></el-table-column>
                <el-table-column prop="creator" label="创建人"></el-table-column>
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" v-if="scope.row.myStatus==1&&scope.row.billStatus==1">已确认</el-button>
                        <el-button type="primary" size="mini" v-else-if="scope.row.myStatus==1&&scope.row.billStatus==2">开票</el-button>
                        <el-button type="danger" size="mini" v-else>取消对账</el-button>

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
            }
        },
        created() {
            this.loadData()
        },
        methods: {
            async loadData() {
                this.loading = true
                const res = await post("/myInfo", this.pageData);
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