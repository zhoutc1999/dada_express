<template>
    <div>
        <el-row :gutter="24" style="margin-bottom: 20px;" class="total">
            <el-col :span="6">
                <el-card shadow="always" class="in">
                    <div style="float: left">
                        <p>盈利</p>
                        <p style="font-weight: bold">￥824,197</p>
                        <p>
                            +20.12%
                            <span style="font-size: 12px;">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets ico"></i>
                    <div style="clear: both;"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="out">
                    <div style="float: left">
                        <p>订单量</p>
                        <p style="font-weight: bold">235,447</p>
                        <p>
                            +1.25%
                            <span style="font-size: 12px;">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-money ico"></i>
                    <div style="clear: both;"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="total-in">
                    <div style="float: left">
                        <p>成交吨数</p>
                        <p style="font-weight: bold">1287,038</p>
                        <p>
                            +11.48%
                            <span style="font-size: 12px;">与去年同比</span>
                        </p>
                    </div>
                    <i class="el-icon-date ico"></i>
                    <div style="clear: both;"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="total-out">
                    <div style="float: left">
                        <p>新用户</p>
                        <p style="font-weight: bold">228</p>
                        <p>
                            -2.06%
                            <span style="font-size: 12px;">与去年同比</span>
                        </p>
                    </div>
                    <i class="el-icon-user ico"></i>
                    <div style="clear: both;"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="18">
                <el-card>
                    <div slot="header" style="text-align: center;">销售记录</div>
                    <div style="height: 240px;" ref="analysis">内容</div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header" style="text-align: center">当月指标</div>
                    <div style="height: 240px" ref="percent">内容</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="mt">
            <el-col :span="12">
                <el-card>
                    <el-timeline>
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/12 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <el-calendar v-model="date">
                    </el-calendar>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
//数据可视化
/*
    1.准备一个容器（用来显示图表)
    2.配置图表配置项（关键步骤）
    3.调用方法，生成图表（setOption）
*/
import * as echarts from 'echarts';
import {get} from "@/utils/http"
    export default {
        data(){
            return {
                date:new Date()
            }
        },
        mounted(){
            this.drawLine(),
            this.drawPie()
        },
        methods:{
            async drawLine(){
                //1.准备一个容器（用来显示图表)
                var myChart = echarts.init(this.$refs.analysis);
                const {data} = await get("/line");
                let keys=[];
                let values=[];
                for(let key in data){
                    keys.push(key);
                    values.push(data[key])
                }    
                //2.配置图表配置项（关键步骤）
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter:'类目是{b}<br/>数值是{c}'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap:false,
                        data: keys,
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: values,
                            type: 'line',
                            smooth:true,
                            areaStyle:{
                                color:{
                                    type:"linear",
                                    x:0,
                                    y:0,
                                    x2:0,
                                    y2:1,
                                    colorStops:[
                                        {
                                            offset:0,
                                            color:"#4f88ff",// 0%处的颜色
                                        },
                                        {
                                            offset:1,
                                            color:"white",// 100%处的颜色
                                        }
                                    ],
                                    global:false, //缺省为false
                                }
                            }
                        }
                    ]
                };
                //3.调用方法，生成图表（setOption）
                myChart.setOption(option)
            },

            drawPie(){
                //1.准备一个容器（用来显示图表)
                var myChart = echarts.init(this.$refs.percent);
                const option={
                    tooltip: {
                        trigger: 'item'
                    },
                    series: [
                        {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    }
</script>

<style lang="less" scoped>
.ico{
    float: right;
    font-size: 90px;
    color: rgba(255,255,255,0.3);
}
.in{
    background: #4f88ff;
}
.out{
    background: #ff3672;
}
.total-in{
    background: #0051ff;
}
.total-out{
    background: #dfab50;
}
.total{
    p{
        line-height: 30px;
        color: #fff;
        font-size: 16px;
    }
}
</style>