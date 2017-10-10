<style scoped>
</style>
<template>
    <div id="charts">
        <div id="try" :style="{width:'600px',height:'400px',background:'red'}"></div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                msg: "123"
            }
        },
        mounted() {
            var myChart = echarts.init(document.getElementById('try'));
            console.log(echarts)
            myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
}
</script>
