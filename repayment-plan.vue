<template>

    <div id="page-repayment-plan">

        <div class="bg"></div>

        <p id="block-2">
            <a href="#!/history-bills">历史账单</a>
        </p>

        <div id="block-no-records" v-if="!showList">

            <img src="../images/bill.png">

            <p>您还没有新的还款计划</p>

        </div>

        <div id="wrap" v-if="showList">
            <div id="block-3">

                <div class="content">

                    <div class="item">
                        <img src="{{whole.merchant_photo_url}}">
                        <div class="right">
                            <p class="line-1">{{whole.merchant_name}}</p>
                            <p class="line">分期金额: {{whole.amount}}</p>
                            <p class="line">期 数: {{whole.period}}期</p>
                            <p class="line">{{whole.date}}</p>
                        </div>

                        <a href="javascript:;">还款中</a>

                    </div>

                </div>
            </div>

            <div id="block-4"><img src="../images/line-2.png"> <span>账单明细</span>
                <p>剩余未还{{detail.remind}}期，剩余未还总额：{{detail.total_amount}}</p></div>


            <div id="block-5">
                <ul class="title">
                    <li class="first">合约还款日</li>
                    <li class="second">应还金额(元)</li>
                    <li class="third"><i>状态</i></li>
                </ul>
                <div class="content">
                    <!-- ing 红色 1 待扣款 3 已逾期
                            waiting 黑色 2 未到期
                            warning 黄色 4 待确认
                      -->
                    <ul :class="{'ing': obj.flag == 1 || obj.flag == 3, 'waiting': obj.flag == 2, 'warning': obj.flag == 4}" v-for="obj in plans"
                        @click="sel($index, obj.flag, obj.amount)">
                        <li class="first">
                            <img src="../images/check-1.png" v-show="obj.flag == 0 || obj.flag == 4">
                            <img src="../images/check-2.png" v-show="obj.flag > 0 && obj.flag < 4 && obj.checked == 1">
                            <img src="../images/check-3.png" v-show="obj.flag > 0 && obj.flag < 4 && obj.checked != 1">
                            {{obj.date}}
                        </li>
                        <li class="second">{{obj.amount}}</li>
                        <li class="third"><i>{{obj.status}}</i></li>
                    </ul>

                </div>
            </div>

            <ul id="block-6">
                <li class="first">
                    <img src="../images/check-2.png" v-if="allSelected" @click="allSel()">
                    <img src="../images/check-3.png" v-if="!allSelected" @click="allSel()">
                </li>
                <li class="second">待支付 <span>{{allAmount}}</span> 元</li>
                <li class="third" :class="{'disabled': !canRepay}" @click="repay()">立即还款</li>
            </ul>
        </div>
    </div>

</template>

<script>

    var $params = {};

    var $data = {
        Len: 0,//可选列表长度
        len: 0,//已选列表长度
        showList: false,//是否显示列表
        allSelected: false,//是否全选
        canRepay: false,//按钮状态
        plans: {},
        detail: {},
        whole: {},
        allAmount: 0//支付金额
    };


    module.exports = {

        route: {

            data: function () {

                var lid = typing.loading(false);

                ajax.get('/v2/history/plan')
                        .then(function (xhr, res) {
                            if (res.code == 0) {

                                for (var i = 0; i < res.data.plans.length; i++) {

                                    res.data.plans[i].checked = 0;
                                }

                                $data.plans = res.data.plans;
                                $data.detail = res.data.detail;
                                $data.whole = res.data.whole;

                                if ($data.plans.length > 0) $data.showList = true;

                                for (var i = 0; i < $data.plans.length; i++) {
                                    if ($data.plans[i].flag > 0 && $data.plans[i].flag < 4) {
                                        $data.Len++;
                                    }
                                }

                                // console.log($data.Len)

                            } else {// code 60001
                                // typing.warning(res.message);
                            }
                        })
                        .complete(function () {
                            typing.close(lid);
                        });

            }

        },

        data: function () {

            return $data;
        },

        methods: {

            sel: function (index, flag, amount) {
                //已还款
                if (flag == 0 || flag == 4) return;

                amount = amount * 1000;
                $data.allAmount = $data.allAmount * 1000;

                //checked选择
                if ($data.plans[index].checked == 0) {

                    $data.plans[index].checked = 1;
                    $data.allAmount += amount;
                    $data.len++;

                } else {
                    $data.plans[index].checked = 0;
                    $data.allAmount -= amount;
                    $data.len--;
                }

                //总金额
                $data.allAmount = ($data.allAmount / 1000).toFixed(2);

                // console.log($data.allAmount);

                //是否全选中
                $data.allSelected = $data.len == $data.Len ? true : false;

                //还款按钮状态
                for (var i = 0; i < $data.plans.length; i++) {
                    if ($data.plans[i].checked) {
                        $data.canRepay = true;
                        break;
                    } else {
                        $data.canRepay = false;
                    }
                }

            },

            allSel: function () {

                var allAmount = 0;

                if ($data.allSelected == false) {
                    $data.allSelected = true;
                    $data.canRepay = true;

                    //每个checked = 1
                    for (var i = 0; i < $data.plans.length; i++) {
                        if ($data.plans[i].flag > 0 && $data.plans[i].flag < 4) {
                            allAmount += $data.plans[i].amount * 1000;
                            $data.plans[i].checked = 1;
                        }
                    }

                    $data.allAmount = (allAmount / 1000).toFixed(2);

                } else {

                    $data.allSelected = false;
                    $data.canRepay = false;
                    $data.allAmount = 0;

                    //每个checked = 0
                    for (var i = 0; i < $data.plans.length; i++) {
                        $data.plans[i].checked = 0;
                    }

                }


            },

            repay: function () {
                var arr = [];

                for (var i = 0; i < $data.plans.length; i++) {
                    if ($data.plans[i].checked) {
                        arr.push($data.plans[i].transaction_id);
                    }
                }

                // console.log(arr.join(','))

                if(arr.length) {
                    location.href = location.origin + "/romantic/?arr=["+arr.join(',')+"]&amount="+$data.allAmount+"#!/search/recharge";
                }

            }

        }

    };

</script>

<style lang="scss">

    @import "../scss/globals";

    #page-repayment-plan {
        padding-bottom: 80px;

        .bg {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            background: #fff;
        }

        #block-no-records {

            text-align: center;

            img {
                width: 118.5px;
                margin-top: 43px;
            }

            p {
                text-align: center;
                color: #383838;
                font-size: 15px;
                margin-top: 47.5px;
            }

        }

        #block-2 {
            text-align: right;
            padding: 11px 17.5px;

            a {
                color: #74CFD6;
                font-size: 17px;
                line-height: 21px;
            }
        }

        #block-3 {

            background: #fff;

            .content {

                .item {
                    padding: 15px 8px;
                    border-bottom: 1px solid #DBDBDB;
                    position: relative;
                    overflow: hidden;

                    img {
                        width: 109px;
                    }

                    .right {

                        position: relative;
                        display: inline-block;
                        margin-left: 12px;
                        position: relative;
                        top: -12px;

                        .line {
                            color: #ADADAD;
                            font-size: 13px;
                            line-height: 18.5px;
                        }
                        .line-1 {
                            color: #383838;
                            font-size: 17px;
                            line-height: 25px;
                            margin-bottom: 3px;
                        }
                    }

                    a {
                        font-size: 17px;
                        color: #383838;
                        position: absolute;
                        bottom: 58px;
                        right: 17px;
                    }

                }

            }

        }

        #block-4 {
            padding: 9px 8px;
            background: #F3F4F6;
            position: relative;

            img {
                width: 5px;
            }

            span {
                font-size: 16px;
                line-height: 22.5px;
                position: relative;
                bottom: 5px;
                left: 1px;
            }

            p {
                color: #ADADAD;
                /* font-size: 13px; */
                position: absolute;
                top: 20px;
                right: 15px;
            }
        }

        #block-5 {
            ul {
                border-bottom: 1px solid #DBDBDB;
                overflow: hidden;

                li {
                    width: 33.3333%;
                    float: left;
                    list-style: none;
                    text-align: center;
                    height: 54px;
                    line-height: 54px;

                    img {
                        width: 17px;
                    }

                    &.first {
                        img {
                            position: relative;
                            top: 2px;
                            margin-right: 5px;
                        }
                    }

                    &.third {
                        text-align: right;

                        i {
                            font-style: normal;
                            margin-right: 15px;
                        }
                    }

                }
            }

            .title {

                color: #383838;
                font-size: 15px;
            }

            .content {
                > ul {
                    color: #C4C4C4;
                    font-size: 15px;
                    li {

                        &.second {
                            color: #FFCECF;
                        }
                    }

                    &.ing {

                        color: #747474;

                        .second {
                            color: #E33133;
                        }

                        .third {
                            color: #E33133;
                        }
                    }

                    &.waiting {

                        color: #747474;

                        .second {
                            color: #E33133;
                        }
                    }
                    &.warning {

                        .third {
                            color: #e0a510;
                        }
                    }

                }
            }
        }

        #block-6 {
            position: fixed;
            width: 100%;
            bottom: 0;
            list-style: none;
            height: 55px;
            line-height: 55px;
            background: #FAFAFA;

            .first {

                img {
                    width: 17px;
                    margin-left: 15px;
                    position: relative;
                    top: 5px;
                }
            }

            .second {
                position: absolute;
                left: 15.26666%;
                top: 0;
                color: #747474;
                font-size: 17px;
                line-height: 55px;

                span {
                    color: #E33133;
                    position: relative;
                    top: 1px;
                }
            }

            .third {
                position: absolute;
                width: 110px;
                height: 55px;
                line-height: 55px;
                right: 0;
                top: 0;
                text-align: center;
                color: #fff;
                font-size: 15px;
                background: #74CFD6;
                &.disabled {
                    background: #DBDBDB !important;
                }
            }
        }

        @media screen and (max-width: 320px) {

            #block-3 {
                padding-bottom: 32px;
                .content {

                    .right {
                        margin-left: 5px !important;
                    }

                    .item {

                        a {
                            font-size: 14px !important;
                            bottom: 44px !important;
                            width: 100px !important;
                            height: 25px !important;
                            line-height: 25px !important;
                            right: -44px;
                        }
                    }
                }
            }

            > button {
                width: 280px;
            }
        }
    }


</style>
