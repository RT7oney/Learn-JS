<template>

    <top-bar></top-bar>

    <dictionary></dictionary>

    <div id="page-profile" class="{{  applyStatus == 1 ? 'wait' : '' }}">

        <p class="tip" v-show="applyStatus != 1 && eduApplyStatus != 'edu-child'">为了您申请顺利通过,请您填写真实有效的信息</p>
        <p class="tip tip2" v-show="eduApplyStatus == 'edu-child'">请注意，父/母帮助子女申请时,本页面填写的是父/母的基本信息</p>

        <div class="n-m-t wrap input-wrap">

            <p class="title"><span class="blue"></span> 身份信息</p>

            <div class="{{ rcReject || secondApply ? 'rc-reject-wrap' : '' }}">
                <div v-show="rcReject || secondApply" class="unable-mask" @click="unableMaskTip()"></div>
                <span>姓名</span>
                <input v-on:blur="cache()"
                       type="text"
                       v-validate="base.individual_name"
                       rule="required & no_number"
                       message="required:姓名不能为空 & no_number:姓名不能包含数字"
                       v-model="base.individual_name"
                       placeholder="请填写真实姓名">
            </div>

            <p id="tip.base.individual_name" class="err-tip"></p>

            <div class="{{ rcReject || secondApply ? 'rc-reject-wrap' : '' }}">
                <div v-show="rcReject || secondApply" class="unable-mask" @click="unableMaskTip()"></div>
                <span>手机号</span>
                <input id="phone-input"
                       v-on:blur="cache()"
                       type="tel"
                       v-validate="base.individual_tel"
                       rule="required & mobile"
                       message="required:手机号不能为空 & mobile:手机格式不正确"
                       v-model="base.individual_tel"
                       maxlength="11"
                       placeholder="请填写您本人的手机号">
            </div>

            <p id="tip.base.individual_tel" class="err-tip"></p>


            <div class="sub" v-show="!rcReject">
                <div>
                    验证码
                    <input v-validate="base.tel_code"
                           rule="required"
                           message="required:验证码不能为空"
                           type="number"
                           v-model="base.tel_code"
                           maxlength="6"
                           placeholder="请输入手机验证码">
                </div>
                <button id="get-cms-code" class="{{ hsaSendGetTelCodeRequest ? 'disabled' : ''}}" @click="getTelCode()">
                    {{ telCodeTxt || '获取验证码' }}
                </button>
            </div>

            <p id="tip.base.tel_code" class="err-tip"></p>

            <div class="{{ rcReject || secondApply ? 'rc-reject-wrap' : '' }}">
                <div v-show="rcReject || secondApply" class="unable-mask" @click="unableMaskTip()"></div>
                <span>身份证号</span>
                <input v-on:blur="cache()"
                       v-validate="base.individual_identity"
                       rule="required & id_card"
                       message="required:身份证号不能为空 & id_card:身份证号码格式不正确"
                       type="text"
                       v-model="base.individual_identity"
                       maxlength="18"
                       placeholder="请填写身份证号码">
            </div>

            <p id="tip.base.individual_identity" class="err-tip"></p>


            <section class="upload-wrap {{ secondApply ? 'rc-reject-wrap' : '' }}">
                <div v-show="secondApply" class="unable-mask" @click="unableMaskTip()"></div>
                <div v-validate="base.idcard_face_url"
                     rule="required"
                     message="required:请上传身份证"
                     v-on:blur="cache()"
                     @click="showUploadTip(1)">

                    <img :src="base.idcard_face_url || './static/images/camera.png'">

                    <p>身份证正面</p>

                    <i id="tip.base.idcard_face_url" class="err-tip"></i>

                </div>

                <div v-validate="base.idcard_back_url"
                     rule="required"
                     message="required:请上传身份证"
                     v-on:blur="cache()"
                     @click="showUploadTip(2)">

                    <img :src="base.idcard_back_url || './static/images/camera.png'">

                    <p>身份证反面</p>

                    <i id="tip.base.idcard_back_url" class="err-tip"></i>
                </div>

                <div v-validate="base.idcard_hand_url"
                     rule="required"
                     message="required:请上传身份证"
                     v-on:blur="cache()"
                     @click="showUploadTip(3)">

                    <img :src="base.idcard_hand_url || './static/images/camera.png'">

                    <p>手持身份证</p>

                    <i id="tip.base.idcard_hand_url" class="err-tip"></i>
                </div>

            </section>


            <div v-validate="address.quId"
                 rule="required"
                 message="required:请选择现居城市"
                 @click="choose_address()">

                <span>现居城市</span>

                <input v-on:blur="cache()"
                       type="hidden"
                       name="address.address"
                       v-model="address.address"
                       data-valid="^.*\S+.*$">

                <img v-show="!address.address" src="../images/caret-right.png">

                <p style="width: 70%; float: right; text-align: right;" class="text-hide">{{ address.address }}</p>

            </div>

            <d-select-address v-bind:item.sync="address"></d-select-address>

            <p id="tip.address.quId" class="err-tip"></p>


            <div>
                <span>详细地址</span>
                <input v-on:blur="cache()" v-validate="base.individual_other_address" rule="required"
                       message="required:详细地址不能为空"
                       type="text"
                       v-model="base.individual_other_address"
                       placeholder="请填写现在居住地址">
            </div>

            <p id="tip.base.individual_other_address" class="err-tip"></p>

            <div
                    v-validate="base.individual_other_house_type"
                    rule="required"
                    message="required:请选择住房"
                    @click="showValues('house_type','base','individual_other_house_type')">

                <span>住房</span>

                <img v-show="!base.individual_other_house_type" src="../images/caret-right.png">

                <b>{{ base.individual_other_house_type | getTxt 'house_type' }}</b>
            </div>

            <p id="tip.base.individual_other_house_type" class="err-tip"></p>


            <div v-validate="base.individual_other_degree"
                 rule="required"
                 message="required:请选择身份状态"
                 @click="showValues('degree','base','individual_other_degree')">

                <span>身份状态</span>

                <img v-show="!base.individual_other_degree" src="../images/caret-right.png">

                <b>{{ base.individual_other_degree | getTxt 'degree' }}</b>
            </div>

            <p id="tip.base.individual_other_degree" class="err-tip"></p>


            <div v-validate="base.individual_other_education"
                 rule="required"
                 message="required:请选择学历"
                 @click="showValues('education','base','individual_other_education')">
                <span>学历</span>

                <img v-show="!base.individual_other_education" src="../images/caret-right.png">

                <b>{{ base.individual_other_education | getTxt 'education' }}</b>
            </div>

            <p id="tip.base.individual_other_education" class="err-tip"></p>


            <div v-show="base.individual_other_education > 11 && base.individual_other_degree == 1">
                <span>毕业院校</span>
                <input v-on:blur="cache()"
                       v-validate="other.individual_other_school"
                       rule="required"
                       message="required:毕业院校不能为空"
                       v-model="other.individual_other_school" type="text"
                       placeholder="请填写学校名称">
            </div>

            <p v-show="base.individual_other_education > 11 && base.individual_other_degree == 1" id="tip.other.individual_other_school2" class="err-tip"></p>


            <div v-validate="base.individual_other_civil"
                 rule="required"
                 message="required:请选择婚姻状态"
                 @click="showValues('civil_state','base','individual_other_civil')">
                <span>婚姻状态</span>
                <img v-show="!base.individual_other_civil" src="../images/caret-right.png">
                <b>{{ base.individual_other_civil | getTxt 'civil_state' }}</b>
            </div>

            <p id="tip.base.individual_other_civil" class="err-tip"></p>


        </div>


        <div v-show="$data.base.individual_other_degree == 1" class="wrap input-wrap">

            <p class="title"><span class="yellow"></span> 工作信息</p>

            <div v-validate="other.individual_other_industry"
                 rule="required"
                 message="required:请选择行业"
                 @click="showValues('industry','other','individual_other_industry')">

                <span>行业</span>

                <img v-show="!other.individual_other_industry" src="../images/caret-right.png">

                <b>{{ other.individual_other_industry | getTxt 'industry' }}</b>
            </div>

            <p id="tip.other.individual_other_industry" class="err-tip"></p>

            <div>
                <span>单位名称</span>
                <input v-on:blur="cache()"
                       v-validate="other.individual_other_company_name"
                       rule="required"
                       message="required:单位名称不能为空"
                       v-model="other.individual_other_company_name"
                       type="text" placeholder="请填写单位名称">
            </div>

            <p id="tip.other.individual_other_company_name" class="err-tip"></p>

            <div>
                <span>单位地址</span>
                <input v-on:blur="cache()"
                       v-validate="other.individual_other_job_address"
                       rule="required"
                       message="required:单位地址不能为空"
                       v-model="other.individual_other_job_address"
                       type="text" placeholder="请填写单位地址">
            </div>

            <p id="tip.other.individual_other_job_address" class="err-tip"></p>


            <div>
                <span>单位电话</span>
                <input v-on:blur="cache()"
                       v-validate="other.individual_other_company_tel"
                       rule="required & tel"
                       message="required:单位电话不能为空 & tel:单位电话格式不正确"
                       v-model="other.individual_other_company_tel"
                       type="tel"
                       placeholder="单位里能联系到您的固定电话">
            </div>

            <p id="tip.other.individual_other_company_tel" class="err-tip"></p>


            <div v-validate="other.individual_other_job_title"
                 rule="required"
                 message="required:请选择职务"
                 @click="showValues('job','other','individual_other_job_title')">

                <span>职务</span>

                <img v-show="!other.individual_other_job_title" src="../images/caret-right.png">

                <b>{{ other.individual_other_job_title | getTxt 'job' }}</b>
            </div>

            <p id="tip.other.individual_other_job_title" class="err-tip"></p>


            <div>
                <span>月收入</span>
                <input v-on:blur="cache()"
                       v-validate="other.individual_other_income"
                       rule="required"
                       message="required:月收入不能为空"
                       v-model="other.individual_other_income"
                       type="text"
                       placeholder="单位（元）">
            </div>

            <p id="tip.other.individual_other_income" class="err-tip"></p>


            <div v-validate="other.individual_other_work_life"
                 rule="required"
                 message="required:请选择工作年限"
                 @click="showValues('work_life','other','individual_other_work_life')">

                <span>工作年限</span>

                <img v-show="!other.individual_other_work_life" src="../images/caret-right.png">

                <b>{{ other.individual_other_work_life | getTxt 'work_life' }}</b>
            </div>

            <p id="tip.other.individual_other_work_life" class="err-tip"></p>


        </div>


        <div v-show="$data.base.individual_other_degree == 2" class="wrap input-wrap">

            <p class="title"><span class="yellow"></span> 学校信息</p>


            <div>
                <span>学校名称</span>
                <input v-on:blur="cache()"
                       v-validate="other.individual_other_school"
                       rule="required"
                       message="required:学校名称不能为空"
                       v-model="other.individual_other_school" type="text"
                       placeholder="请填写学校名称">
            </div>

            <p id="tip.other.individual_other_school" class="err-tip"></p>

            <div>
                <span>月生活费</span>
                <input v-on:blur="cache()"
                       v-validate="other.individual_other_alimony"
                       rule="required & money"
                       message="required:月生活费不能为空 & money:金额格式不正确"
                       v-model="other.individual_other_alimony"
                       type="number"
                       placeholder="单位（元）">
            </div>

            <p id="tip.other.individual_other_alimony" class="err-tip"></p>

            <div>
                <span>月收入</span>
                <input v-on:blur="cache()"
                       v-validate="other.individual_other_income"
                       rule="required"
                       message="required:月收入不能为空"
                       v-model="other.individual_other_income"
                       type="text"
                       placeholder="单位（元）">
            </div>

            <p id="tip.other.individual_other_income2" class="err-tip"></p>

        </div>

        <div v-show="eduApplyStatus == 'edu-child' " id="child-info" class="wrap input-wrap">

            <p class="title"><span class="yellow"></span> 实际上课子女信息</p>


            <div>
                <span>子女姓名</span>
                <input v-on:blur="cache()"
                       v-validate="benefit.individual_benefit_name"
                       rule="required"
                       message="required:子女姓名不能为空"
                       v-model="benefit.individual_benefit_name" type="text"
                       placeholder="子女姓名">
            </div>

            <p id="tip.benefit.individual_benefit_name" class="err-tip"></p>

            <div>
                <span>子女手机号</span>
                <input v-on:blur="cache()"
                       v-validate="benefit.individual_benefit_tel"
                       rule="sometimes & mobile"
                       message="mobile:手机号格式不正确"
                       v-model="benefit.individual_benefit_tel"
                       type="number"
                       maxlength="11"
                       placeholder="非必填">
            </div>

            <p id="tip.benefit.individual_benefit_tel" class="err-tip"></p>

            <div>
                <span>子女身份证号</span>
                <input v-on:blur="cache()"
                       v-validate="benefit.individual_benefit_identity"
                       rule="required & id_card"
                       message="required:子女身份证号不能为空 & id_card:身份证号格式不正确"
                       v-model="benefit.individual_benefit_identity"
                       type="text"
                       placeholder="请填写身份证号码">
            </div>

            <p id="tip.benefit.individual_benefit_identity" class="err-tip"></p>

            <section class="upload-wrap">

                <div v-on:blur="cache()"
                     @click="showUploadTip(4)">

                    <img :src="benefit.individual_benefit_front_url || './static/images/camera.png'">

                    <p>身份证正面</p>
                    <span>*非必填</span>

                </div>

                <div v-on:blur="cache()"
                     @click="showUploadTip(5)">

                    <img :src="benefit.individual_benefit_back_url || './static/images/camera.png'">

                    <p>身份证反面</p>
                    <span>*非必填</span>

                </div>

            </section>

        </div>

        <div class="input-wrap">

            <p class="title"><span class="red"></span> 直系亲属</p>

            <template v-for="item in contact" track-by="$index">

                <p class="contact-del" v-show="$index !== 0" @click="delContact($index)"><img src="../images/close.png">
                    取消添加</p>

                <div>
                    <span>姓名</span>
                    <input v-on:blur="cache()"
                           v-validate="contact.#.individual_contact_name"
                           v-bind:index="$index"
                           v-bind:model="item.individual_contact_name"
                           v-model="item.individual_contact_name"
                           type="text"
                           placeholder="亲属姓名"
                           rule="required"
                           message="required:姓名不能为空">
                </div>

                <p id="tip.contact.{{ $index }}.individual_contact_name" class="err-tip"></p>


                <div v-validate="contact.#.individual_contact_relation"
                     v-bind:index="$index"
                     v-bind:model="item.individual_contact_relation"
                     rule="required"
                     message="required:请选择关系"
                     @click="showValues('relation','contact',$index)">

                    <span>关系</span>

                    <img v-show="!item.individual_contact_relation" src="../images/caret-right.png">

                    <b>{{ item.individual_contact_relation | getTxt 'relation' }}</b>
                </div>

                <p id="tip.contact.{{ $index }}.individual_contact_relation" class="err-tip"></p>

                <div>
                    <span>联系电话</span>
                    <input
                            v-on:blur="cache()"
                            v-validate="contact.#.individual_contact_phone"
                            v-bind:index="$index"
                            v-bind:model="item.individual_contact_phone"
                            rule="required & tel"
                            message="required:联系电话不能为空 & tel:联系电话格式不正确"
                            v-model="item.individual_contact_phone"
                            type="tel"
                            maxlength="11"
                            placeholder="亲属联系电话">
                </div>

                <p id="tip.contact.{{ $index }}.individual_contact_phone" class="err-tip"></p>

            </template>

            <a v-show="applyStatus != 1" v-show="hideNext" id="add-more" href="javascript:;" @click="add_more()">
                <img src="../images/plus.png">
                添加直系亲属
            </a>

        </div>

        <div v-show="!rcReject" class="input-wrap">

            <p class="title"><span class="orange"></span> 银行卡 <i>用来还款时自动扣款</i></p>

            <div class="{{ secondApply ? 'rc-reject-wrap' : '' }}">

                <div v-show="secondApply" class="unable-mask" @click="unableMaskTip()"></div>

                <span>银行卡号</span>
                <input v-on:blur="cache()"
                       v-validate="bind.bank"
                       rule="required"
                       message="required:银行卡号不能为空"
                       v-model="bind.bank"
                       type="number"
                       placeholder="仅支持储蓄卡">
            </div>

            <p id="tip.bind.bank" class="err-tip"></p>

            <p id="bank-card-tip" v-show="showBankCardTip && bind.bank != '' ">
                {{ bankTipTxt || '该银行卡不支持' }}
                <a v-on:click="clickShowBankCardTipContent()" href="javascript:;">查看支持银行卡类型</a>
            </p>

            <div v-show="!secondApply">
                <span>手机号</span>
                <input v-on:blur="cache()"
                       v-validate="bind.phone"
                       rule="required & mobile"
                       message="required:手机号不能为空 & mobile:手机号格式不正确"
                       v-model="bind.phone"
                       type="tel"
                       maxlength="11"
                       placeholder="该银行卡在银行预留的手机号"/>
            </div>

            <p id="tip.bind.phone" class="err-tip"></p>


            <div id="bank-card-tip-content" v-show="showBankCardTipContent">
                <div class="mask" @click="clickHideBankCardTipContent()"></div>
                <section>
                    <div class="title">支持的银行卡类型</div>
                    <div class="body">
                        <a href="javascript:;" v-for="item in bankList"><i>{{ item }}</i></a>
                        <li><i>更多银行支持敬请期待...</i></li>
                    </div>
                </section>

            </div>

        </div>

        <button v-show="hideNext || rcReject || secondApply || eduApplyStatus == 'edu-child'" class="next active"
                @click="submit()">
            {{ rcReject ? '提交' : '下一步' }}
        </button>
        <!--<button class="next active" @click="submit()">{{ rcReject ? '提交' : '下一步' }}</button>-->

        <div id="mask" v-show="applyStatus == 1">

        </div>


        <div id="upload-mask" @click="hideUploadTip()"></div>

        <div id="upload-tip-1" class="upload-tip">
            <div class="title">身份证正面示例</div>
            <img src="../images/upload-tip-11.png">
            <p>请确保照片中的身份证清晰可识别</p>
            <button @click="uploads('base','idcard_face_url',1)">去上传</button>
        </div>

        <div id="upload-tip-2" class="upload-tip">
            <div class="title">身份证反面示例</div>
            <img src="../images/upload-tip-22.png">
            <p>请确保照片中的身份证清晰可识别</p>
            <button @click="uploads('base','idcard_back_url',2)">去上传</button>
        </div>

        <div id="upload-tip-3" class="upload-tip">
            <div class="title">手持身份证示例</div>
            <img src="../images/upload-tip-33.png">
            <p>请手持身份证自拍，确保照片中的身份证清晰可识别</p>
            <button @click="uploads('base','idcard_hand_url',3)">去上传</button>
        </div>

        <div id="upload-tip-4" class="upload-tip">
            <div class="title">身份证正面示例</div>
            <img src="../images/upload-tip-11.png">
            <p>请确保照片中的身份证清晰可识别</p>
            <button @click="uploads('benefit','individual_benefit_front_url',4)">去上传</button>
        </div>

        <div id="upload-tip-5" class="upload-tip">
            <div class="title">身份证反面示例</div>
            <img src="../images/upload-tip-22.png">
            <p>请确保照片中的身份证清晰可识别</p>
            <button @click="uploads('benefit','individual_benefit_back_url',5)">去上传</button>
        </div>


    </div>

</template>

<script>

    var async = require('async');

    var merge = require('../services/merge');

    var trim = require('../services/trim');

    var validate = require('../services/validate');

    var TopBar = require('../components/top-bar.vue');

    var Dictionary = require('../components/dictionary.vue');

    var DSelectAddress = require('../components/DSelectAddress.vue');

    var base64_encode = require('../vuezilla/functions/base64_encode');


    // 字典数据过滤器
    Vue.filter('getTxt', function (index, key) {

        return Dictionary.getTxt(key, index);
    });

    // 联系人模板
    var $contact = {
        individual_contact_id: 0,           // 联系人ID，新增用户默认为 0
        individual_contact_name: null,      // 联系人姓名
        individual_contact_relation: null,  // 联系人关系
        individual_contact_phone: null      // 联系人电话
    };

    // 设置缓存
    var setCache = function () {

        localStorage.setItem('profile.cache', JSON.stringify($data));
    };

    // 获取缓存数据
    var getCache = function () {

        return localStorage.getItem('profile.cache') ? JSON.parse(localStorage.getItem('profile.cache')) : {};
    };

    // 清除缓存数据
    var clearCache = function () {

        localStorage.removeItem('profile.cache');
    };

    // 数据绑定对象
    var $data = {

        // 标记是否点击短信验证码发送
        hsaSendGetTelCodeRequest: false,

        // 短信验证码倒计时文案
        telCodeTxt: null,

        // 隐藏手机验证
        hideBaseTelCode: false,

        // 隐藏下一步
        hideNext: false,

        // 申请状态
        applyStatus: null,

        // 风控退回状态
        rcReject: false,

        // 二次申请状态
        secondApply: false,

        // 教育分期状态
        eduApplyStatus: false,

        // 选择省级市
        address: {
            show: false,
            ready: false,
            shengId: null,
            shiId: null,
            quId: null,
            address: ''
        },

        bankList: [
            '工商银行',
            '农业银行',
            '中国银行',
            '建设银行',
            '招商银行',
            '浦东发展银行',
            '光大银行',
            '深发/平安银行',
            '华夏银行',
            '兴业银行',
            '中信银行',
            '邮政储蓄银行',
            '广发银行',
            '民生银行',
            '交通银行',
            '北京银行',
            '恒丰银行'
        ],

        // 银行卡提示信息文案
        bankTipTxt: null,

        // 银行卡显示提示开关
        showBankCardTip: false,

        // 显示银行提示内容
        showBankCardTipContent: false,

        // 基本信息
        base: {
            individual_name: null,          // 姓名
            individual_tel: null,           // 手机号
            tel_code: null,                 // 短信验证码
            individual_identity: null,      // 身份证号码
            idcard_face_url: null,          // 身份证正面照片链接
            idcard_back_url: null,          // 身份证反面照片链接
            idcard_hand_url: null,          // 手持身份证照片链接
            individual_other_county_code: null, // 地区区代码
            individual_other_address: null,     // 现住址
            individual_other_house_type: null,  // 住房类型
            individual_other_education: null,   // 学历类型
            individual_other_degree: null,      // 身份状态
            individual_other_civil: null,       // 婚姻状态
            longitude: 0,                     // 经度
            latitude: 0,                      // 纬度
            isSub: 0                             // 是否为自己申请 0 是为自己申请, 1 是为他人申请
        },

        // 工作信息
        other: {
            individual_other_industry: null,        // 行业类型
            individual_other_company_name: null,    // 单位名称
            individual_other_job_address: null,    // 单位地址
            individual_other_company_tel: null,     // 单位电话
            individual_other_job_title: null,       // 职务
            individual_other_income: null,          // 月收入
            individual_other_work_life: null,       // 工作年限
            individual_other_school: null,          // 学校名称
            individual_other_alimony: null          // 月生活费
        },

        // 实际上课的子女信息
        benefit: {
            individual_benefit_id: null,            // 子女的 ID
            individual_benefit_name: null,          // 子女的姓名
            individual_benefit_tel: null,           // 子女的电话号码
            individual_benefit_identity: null,      // 子女的身份证号
            individual_benefit_front_url: null,     // 子女身份证正面
            individual_benefit_back_url: null       // 子女身份证反面
        },

        // 直系亲属
        contact: [merge({}, $contact)],


        //  绑定银行卡
        bind: {
            phone: null, // 银行卡预留电话
            bank: null   // 银行卡
        }

    };

    // 获取缓存
    var data = {};

    // 工作信息验证字段
    var other_rule_1 = [
        'other.individual_other_industry',
        'other.individual_other_company_name',
        'other.individual_other_job_address',
        'other.individual_other_company_tel',
        'other.individual_other_job_title',
        'other.individual_other_work_life'
    ];

    // 学校信息字段
    var other_rule_2 = [
        'other.individual_other_school',
        'other.individual_other_alimony'
    ];

    // 子女验证字段
    var benefit_rule = [
        'benefit.individual_benefit_name',
        'benefit.individual_benefit_identity'
    ];

    // 接收的路由参数
    var $params = {
        apply_merchant_id: null,    // 必须, 商户ID,新增时必填
        apply_product_id: null,     // 必须, 申请的产品ID,新增时必填
        apply_amount: null,         // 必须, 申请金额,新增时必填
        apply_period_count: null,   // 必须, 申请分期数,新增时必填
        apply_status: null,         // 申请状态, 将会处理草稿, 风控退回(5) , 二次申请(21)等状态, 非必须
        second_apply: null,         // 是否为二次申请状态
        redirect_type: null        // 调整类型标识教育分期, edu 标识教育分期我自己, edu-child 教育分期孩子
    };

    // 消息提示标签缓存对象
    // TODO 退回页面的时候,为什么这里一定要用缓存才能够读取到页面的元素呢?
    var tipElems = {};

    // 自动滚动垂直滚动条
    var autoScrollToTop = function (top) {

        window.scrollTo(0, top);

    };

    // 获取第一个展示出来的消息提示元素
    // 第一个是指 offsetTop 值最小
    var getFirstTipElemOffsetTop = function () {

        var top = 0;

        var min = document.body.scrollHeight;

        var elem = null;

        for (var i in tipElems) {

            if (tipElems[i] && tipElems[i].style.display == 'block' && tipElems[i].offsetTop < min) {


                // 父元素被隐藏，子元素也会隐藏，但是 display 属性依然是 block
                // 详情参见： https://vuezilla.lehu.io/fu_zi_yuan_su_display_shu_xing.html
                if ($data.base.individual_other_degree === null && tipElems[i].id.indexOf('other.') != -1) {

                    continue;
                }

                elem = tipElems[i];

                min = top = tipElems[i].offsetTop;

            }

        }

//        console.log($data.base.individual_other_degree);

//        console.log(elem);

        return top - 150;
    };

    // 设置校验结果回调函数
    validate.callback(function (pass, target, message) {

        var elem = null;

        var incomeElem = null;

        var schoolElem = null;

        if (target == 'other.individual_other_income') {


            if ($data.base.individual_other_degree == 2) {

                target += 2;

                // 如果状态切换时需要另外一个收入标签隐藏
                incomeElem = document.getElementById('tip.other.individual_other_income');

                if (incomeElem) {

                    incomeElem.style.display = 'none';
                }

            }
            else {

                // 如果状态切换时需要另外一个收入标签隐藏
                incomeElem = document.getElementById('tip.other.individual_other_income2');

                if (incomeElem) {
                    incomeElem.style.display = 'none';
                }

            }
        }

        if (target == 'other.individual_other_school') {

            // 为添加的学校字段做处理
            if ($data.base.individual_other_degree == 1 && $data.base.individual_other_education > 11) {

                target += 2;

                // 如果状态切换时需要另外学校标签隐藏
                schoolElem = document.getElementById('tip.other.individual_other_school');

                if (schoolElem) {

                    schoolElem.style.display = 'none';
                }

            }
            else {

                // 如果状态切换时需要另外学校标签隐藏
                schoolElem = document.getElementById('tip.other.individual_other_school2');

                if (schoolElem) {

                    schoolElem.style.display = 'none';
                }

            }
        }


        if (typeof tipElems[target] == 'undefined') {

            elem = document.getElementById('tip.' + target);

            tipElems[target] = elem;

        } else {

            elem = tipElems[target];
        }


        if (pass) {

            if (elem) {

                elem.style.display = 'none';

                elem.innerHTML = '';
            }

        } else {

            if (elem) {

                elem.style.display = 'block';

                elem.innerHTML = message;
            }

        }


    });

    // 导出 vue 对象
    module.exports = {

        ready: function () {

            if (typeof $params.clear_cache === 'undefined') {

                data = getCache();

                if (typeof data.address != 'undefined') {

                    $data.address = merge($data.address, data.address);
                }


                if (typeof data.base != 'undefined') {

                    $data.base = merge($data.base, data.base);

                    $data.base.tel_code = null;
                }

                if (typeof data.other != 'undefined') {
                    $data.other = merge($data.other, data.other);

                }

                if (typeof data.benefit != 'undefined') {

                    $data.benefit = merge($data.benefit, data.benefit);
                }

                if (typeof data.bind != 'undefined') {

                    $data.bind = merge($data.bind, data.bind);
                }

                if (typeof data.contact != 'undefined') {

                    $data.contact = data.contact;
                }

                // 配置默认验证规则
                if ($data.base.individual_other_degree == 1) {

                    validate.add(other_rule_1);
                    validate.ignore(other_rule_2);

                } else if ($data.base.individual_other_degree == 2) {

                    validate.add(other_rule_2);
                    validate.ignore(other_rule_1);

                } else {

                    validate.ignore(other_rule_1);
                    validate.ignore(other_rule_2);
                }

                // 为选择身份状态和学历作单独判断,以显示毕业院校
                if ($data.base.individual_other_degree == 1 && $data.base.individual_other_education > 11) {

                    validate.add(['other.individual_other_school']);
                } else {

                    validate.ignore(['other.individual_other_school']);
                }

            }


        },

        watch: {

            'bind.bank': function (val, oldVal) {

                val = val || '';

                oldVal = oldVal || '';

                if (val.length == 6 && val.length > oldVal.length) {

                    ajax.post('/v2/addition/hf-check', {
                        bank: val.substring(0, 6)
                    }).then(function (xhr, res) {

                        if (res.code == 0) {

                            $data.showBankCardTip = false;

                        } else {

                            $data.showBankCardTip = true;
                            $data.bankTipTxt = res.message;
                        }

                    })
                }

            }

        },

        route: {

            data: function () {

                // 对于缓存的DOM对象进行清空
                tipElems = {};

                // 获取路由参数
                $params = this.$route.query;

                TopBar.setActive(0);


                // 设置步骤状态
                if (typeof $params.apply_status !== 'undefined') {

                    $data.applyStatus = $params.apply_status;

                    //  用户资料回显状态
                    if ($params.apply_status == 1) {

                        TopBar.setActive(3);
                    } else if ($params.apply_status == 21) {

                        TopBar.setActive(0);

                    } else if ($params.apply_status > 1) {

                        TopBar.setActive(4);
                    }

                    // 用户被风控退回状态
                    if ($params.apply_status == 5) {

                        TopBar.hide();

                        $data.rcReject = true;

                        // 如果是风控退回状态则忽略短信验证码校验
                        validate.ignore(['base.tel_code']);
                    }

                }

                // 用户二次申请状态
                if ($params.second_apply == 1 && $params.apply_status != 5) {

                    layer.open({
                        content: '为了您顺利通过申请，请更新资料',
                        shadeClose: true,
                        btn: ['我知道了']
                    });

                    $data.secondApply = true;

                    validate.ignore(['bind.phone']);
                }

                // 教育分期状态
                $data.eduApplyStatus = typeof $params.redirect_type != 'undefined' ? $params.redirect_type : false;


                // 预留清除缓存接口
                if (typeof $params.clear_cache !== 'undefined') {

                    clearCache();
                }

                // 如果没有商户ID,则不显示下一步
                $data.hideNext = typeof $params.apply_merchant_id != 'undefined';

                !$data.hideNext && title('查看基本资料');


            }
        },

        data: function () {

            ajax.post('/v2/file/sign?SignPackage=romantic&time=' + Date.parse(new Date()))
                    .then(function (xhr, res) {
                        if (res.data) {
                            wx.config({
                                debug: false,
                                appId: res.data.appId,
                                timestamp: res.data.timestamp,
                                nonceStr: res.data.nonceStr,
                                signature: res.data.signature,
                                jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocation'],
                            });
                        }
                    });

            // 微信接口认证
            wx.ready(function () {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        $data.base.latitude = res.latitude || 0;
                        $data.base.longitude = res.longitude || 0;
                    }
                });
            });

            // 获取存储信息
            ajax.get('/v2/apply/base-all').then(function (xhr, res) {

                if (res.code == 0) {

                    $data.address.ready = true;

                    // $data.base.individual_other_county_code = res.data.base.individual_other_county_code;
                    $data.address.shengId = res.data.base.individual_other_province_code;
                    $data.address.shiId = res.data.base.individual_other_city_code;
                    $data.address.quId = res.data.base.individual_other_county_code;

                    // 其他信息
                    $data.base = res.data.base;

                    // 其他信息
                    $data.other = res.data.other;

                    // 教育子女信息
                    if (typeof res.data.benefit != 'undefined' && res.data.benefit) {

                        $data.benefit = res.data.benefit;
                    }

                    // 联系人信息
                    $data.contact = res.data.contact;

                    // 银行卡信息
                    $data.bind = merge($data.bind, res.data.bind);

                    // 设置身份状态信息对应的验证字段
                    if ($data.base.individual_other_degree == 1) {

                        validate.add(other_rule_1);
                        validate.ignore(other_rule_2);


                    } else if ($data.base.individual_other_degree == 2) {

                        validate.add(other_rule_2);
                        validate.ignore(other_rule_1);

                    } else {

                        validate.ignore(other_rule_1);
                        validate.ignore(other_rule_2);

                    }

                    // 为选择身份状态和学历作单独判断,以显示毕业院校
                    if ($data.base.individual_other_degree == 1 && $data.base.individual_other_education > 11) {

                        validate.add(['other.individual_other_school']);
                    } else {

                        validate.ignore(['other.individual_other_school']);
                    }

                    // 消除由于缓存注册的多余的联系人表单验证规则
                    if (typeof data.contact != 'undefined' && $data.contact.length < data.contact.length) {

                        for (var i = $data.contact.length; i < data.contact.length; i++) {

                            validate.removeArrayItem('contact', i);
                        }
                    }

                }

            });

            return $data;
        },

        methods: {

            // 显示地址下拉列表
            choose_address: function () {

                $data.address.show = true;
            },

            // 表单失去焦点时进行缓存
            cache: function () {

                setCache();
            },

            // 禁止修改表单项点击提示
            unableMaskTip: function () {

                typing.tip('该信息不能修改哦!');
            },

            // 隐藏上传提示
            hideUploadTip: function () {
                // 隐藏上传提示
                document.getElementById('upload-mask').style.display = 'none';
                document.getElementById('upload-tip-1').style.display = 'none';
                document.getElementById('upload-tip-2').style.display = 'none';
                document.getElementById('upload-tip-3').style.display = 'none';
                document.getElementById('upload-tip-4').style.display = 'none';
                document.getElementById('upload-tip-5').style.display = 'none';
            },

            // 显示上传提示
            showUploadTip: function (index) {

                document.getElementById('upload-mask').style.display = 'block';
                document.getElementById('upload-tip-' + index).style.display = 'block';

            },

            // 删除联系人
            delContact: function (index) {

                validate.removeArrayItem('contact', index);
                $data.contact.splice(index, 1);
                tipElems = {};
            },

            // 证件图片上传
            uploads: function (key, name, index) {

                // 隐藏上传提示
                document.getElementById('upload-mask').style.display = 'none';
                document.getElementById('upload-tip-' + index).style.display = 'none';

                if (!$data.hideNext) return;

                // 弹出 loading 窗口
                var win = null;

                wx.chooseImage({
                    count: 1,
                    sizeType: ['compressed'],
                    sourceType: ['album', 'camera'],
                    success: function (res) {

                        win = typing.loading(false);

                        wx.uploadImage({
                            localId: res.localIds[0],
                            isShowProgressTips: 0,
                            success: function (res) {

                                var $params = {
                                    media_id: res.serverId
                                };
                                async.parallel([

                                    function (callback) {
                                        ajax.post('/v2/file/upload-img', $params)
                                                .then(function (xhr, response) {

                                                    if (response.code == 0) {

                                                        $data[key][name] = response.data.img_url;

                                                    } else {

                                                        typing.tip(response.message);
                                                    }

                                                    typing.close(win);

                                                    callback();

                                                })
                                                .catch(function (response) {

                                                    typing.tip('网络错误');

                                                    typing.close(win);
                                                });
                                    }

                                ]);
                            }
                        });
                    }
                });
            },

            // 显示下拉选项
            showValues: function (key, data_key, data_index) {

                Dictionary.showValues(key, function (key, index) {

                    // 为证身份状态单独处理
                    if (key == 'degree') {

                        if (index == 1) {

                            validate.add(other_rule_1);
                            validate.ignore(other_rule_2);

                        } else {

                            validate.add(other_rule_2);
                            validate.ignore(other_rule_1);

                        }

                    }


                    // 为联系人关系选项作单独处理
                    if (data_key != 'contact') {

                        $data[data_key][data_index] = index;

                    } else {

                        $data.contact[data_index].individual_contact_relation = index;

                    }

                    // 为选择身份状态和学历作单独判断,以显示毕业院校
                    if (key == 'education' || key == 'degree') {

                        if ($data.base.individual_other_degree == 1 && $data.base.individual_other_education > 11) {

                            validate.add(['other.individual_other_school']);
                        } else {

                            validate.ignore(['other.individual_other_school']);
                        }
                    }


                    setCache();

                });

            },

            // 添加更多联系人
            add_more: function () {

                $data.contact.push(merge({}, $contact));
            },

            // 点击按钮获取短信验证码
            getTelCode: function () {

                var tipElem = document.getElementById('tip.base.individual_tel');

                if (!validate.check('required', $data.base.individual_tel)) {

                    tipElem.style.display = 'block';

                    tipElem.innerHTML = '手机号不能为空';

                    return;

                }

                if (!validate.check('mobile', $data.base.individual_tel)) {

                    tipElem.style.display = 'block';

                    tipElem.innerHTML = '手机号格式不正确';

                    return;

                }

                if ($data.hsaSendGetTelCodeRequest == true) {

                    return;
                }

                ajax.get('/v2/util/get-tel-code', {tel: $data.base.individual_tel})
                        .then(function (xhr, res) {

                            if (res.code == 0) {

                                $data.hsaSendGetTelCodeRequest = true;

                                var start = 60;

                                var timer = setInterval(function () {

                                    $data.telCodeTxt = start + 's';

                                    start--;

                                    if (start == 0) {

                                        $data.hsaSendGetTelCodeRequest = false;

                                        $data.telCodeTxt = null;

                                        clearInterval(timer);
                                    }


                                }, 1000);

                            } else {

                                typing.tip(res.message);

                            }


                        })
                        .catch(function (e) {

                            typing.tip('获取短信验证码网络错误');
                        });

            },


            clickShowBankCardTipContent: function () {

                $data.showBankCardTipContent = true;

            },

            clickHideBankCardTipContent: function () {

                $data.showBankCardTipContent = false;

            },

            // 提交表单
            submit: function () {

                if ($params.apply_status == 1) {

                    typing.tip('您提交的资料正在审核');

                    return;
                }

                // 非教育类忽略教育孩子验证规则
                if ($data.eduApplyStatus != 'edu-child') {

                    validate.ignore(benefit_rule);
                }

                setCache();

                if (!validate.all($data)) {

                    // 自动滚动到提示位置
                    autoScrollToTop(getFirstTipElemOffsetTop());

                    return false;
                }

                // 如果银行卡提示出现
                // 则说明银行卡校验失败
                if ($data.showBankCardTip) {

                    return false;
                }

                // 弹出 loading 窗口
                var win = typing.loading(false);

                // 赋值 base.isSub 字段
                $data.base.isSub = $data.eduApplyStatus == 'edu-child' ? 1 : 0;

                // 重赋值地区选项
                $data.base.individual_other_county_code = $data.address.quId;

                var url = $data.secondApply ? '/v2/second/save-base' : '/v2/apply/save-base';

                // 提交身份信息
                ajax.post(url, merge($data.base, $params))
                        .then(function (xhr, res) {


                            if (res.code == 0) {

                                // 等待基本信息提交成功以后执行后面的操作
                                // 后面的接口依赖此基本信息接口
                                async.parallel([

                                    // 提交工作信息
                                    function (callback) {


                                        if ($data.base.individual_other_degree == 1) {

                                            $data.other.individual_other_alimony = null;

                                            // 在职的时候,如果学历低于专科,则毕业院校不显示, 清空毕业院校
                                            if ($data.base.individual_other_education <= 11) {

                                                $data.other.individual_other_school = null;
                                            }

                                        } else if ($data.base.individual_other_degree == 2) {

                                            $data.other.individual_other_industry = null;
                                            $data.other.individual_other_company_name = null;
                                            $data.other.individual_other_job_address = null;
                                            $data.other.individual_other_company_tel = null;
                                            $data.other.individual_other_job_title = null;
                                            $data.other.individual_other_work_life = null;

                                        }



                                        ajax.post('/v2/apply/save-other', $data.other).then(function (xhr, res) {

                                            if (res.code != 0) {

                                                $data.other = getCache().other;

                                            }

                                            callback(null, res);

                                        }).catch(function (e) {

                                            callback(null, false);
                                        });

                                    },

                                    // 提交直系亲属信息
                                    function (callback) {

                                        ajax.post('/v2/apply/save-contact', {"contact_list": $data.contact}).then(function (xhr, res) {

                                            callback(null, res);


                                        }).catch(function (e) {

                                            callback(null, false);
                                        });
                                    },

                                    // 保存子女信息
                                    function (callback) {

                                        if ($data.eduApplyStatus != 'edu-child') {

                                            callback(null, {code: 0});

                                        } else {

                                            ajax.post('/v2/apply/save-benefit', $data.benefit).then(function (xhr, res) {

                                                callback(null, res);


                                            }).catch(function (e) {

                                                callback(null, false);
                                            });
                                        }
                                    },

                                    // 提交银行卡信息
                                    function (callback) {

                                        // 如果是风控退回状态，则不用再提交银行卡信息
                                        if ($data.rcReject || $data.secondApply) {

                                            callback(null, {code: 0});

                                        } else {

                                            ajax.post('/v2/addition/bank-hf', $data.bind).then(function (xhr, res) {

                                                callback(null, res);


                                            }).catch(function (e) {

                                                callback(null, false);
                                            });
                                        }
                                    }
                                ], function (err, results) {

                                    var pass = true;

                                    // 遍历3个接口响应结果
                                    for (var i in results) {

                                        if (results[i] === false) {

                                            typing.tip('网络错误');

                                            pass = false;

                                        } else {

                                            // 10105 是一种额外状态的码， 需要单独处理
                                            if (results[i].code != 0 && results[i].code != 10105) {

                                                pass = false;

                                                // 处理银行卡格式错误
                                                if (results[i].code == 10101) {

                                                    var elem = document.getElementById('tip.bind.bank');

                                                    elem.style.display = 'block';

                                                    elem.innerHTML = '银行卡号格式不正确';

                                                    autoScrollToTop(getFirstTipElemOffsetTop());
                                                }
                                                // 处理单位电话错误
                                                else if (results[i].code == 10026) {

                                                    var elem = document.getElementById('tip.other.individual_other_company_tel');

                                                    elem.style.display = 'block';

                                                    elem.innerHTML = '单位电话格式不正确';

                                                    autoScrollToTop(getFirstTipElemOffsetTop());
                                                }
                                                else {
                                                    // alert(results[i].code + ' ' + results[i].message);
                                                    typing.tip(results[i].message);
                                                }


                                            }

                                        }
                                    }

                                    if (pass) {

                                        // 清除缓存数据
                                        clearCache();

                                        // 清除所有的验证规则
                                        validate.removeAll();

                                        // 记录银行卡特殊跳转，询问王俊峰泽
                                        var no_10105 = true;

                                        // 处理绑定银行卡的特殊情况
                                        for (var j in results) {

                                            if (results[j].code == 10105) {

                                                no_10105 = false;

                                                layer.open({
                                                    content: results[j].message,
                                                    shadeClose: false,
                                                    btn: ['我知道了'],
                                                    end: function () {

                                                        location.href = '#!ali-sesame?phone=' + $data.base.individual_tel;
                                                    }
                                                });

                                            }
                                        }

                                        typing.close(win);

                                        // 如果银行卡没有跳转，则走正常的跳转流程
                                        // 风控退回状态下，不验证银行卡
                                        if (no_10105) {

                                            if (!$data.rcReject) {

                                                // 如果不是风控驳回的状态，则正常调整到芝麻信用
                                                location.href = '#!ali-sesame?phone=' + $data.base.individual_tel;

                                            } else {

                                                // 如果是风控驳回的状态，提交时经由 王俊峰泽的中间页，跳转到审核页面
                                                // 这里对于 romantic2 目录是写死的
                                                location.href = '/v2/apply/save-ticket?redirect_to=' + base64_encode(location.protocol + '//' + location.host + '/romantic2/#!pending-review');

                                                //location.href = '#!/pending-review';
                                            }
                                        }

                                    } else {

                                        typing.close(win);
                                    }

                                });


                            }
                            // 处理身份证格式错误
                            else if (res.code == 10001) {

                                typing.close(win);

                                var elem = document.getElementById('tip.base.individual_identity');

                                elem.style.display = 'block';

                                elem.innerHTML = '身份证号格式不正确';

                                autoScrollToTop(getFirstTipElemOffsetTop());
                            }
                            // 处理验证码错误
                            else if (res.code == 1001) {

                                typing.close(win);

                                var elem = document.getElementById('tip.base.tel_code');

                                elem.style.display = 'block';

                                elem.innerHTML = '验证码不正确';

                                autoScrollToTop(getFirstTipElemOffsetTop());
                            }
                            else {

                                typing.close(win);

                                typing.tip(res.message);
                            }


                        })
                        .catch(function (e) {

                            typing.tip('网络错误');

                            typing.close(win);

                        });

            }


        },

        components: {
            TopBar: TopBar,
            Dictionary: Dictionary,
            DSelectAddress: DSelectAddress
        }

    };


</script>

<style lang="scss">

    #page-profile {

        padding-bottom: 40px;

        &.wait {

            margin-top: 15px;
        }

        #mask {
            position: fixed;
            top: 0;
            width: 100%;
            height: 1000%;
            z-index: 1000;
        }

        /**
         * 超出块的文字显示省略号
         */
        .text-hide {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .tip {
            text-align: center;
            height: 50px;
            line-height: 50px;
            font-size: 15px;
        }

        .tip2 {
            margin-top: 7.5px;
            margin-bottom: 7.5px;
            padding: 0 30px;
            line-height: 21px;
        }

        .n-m-t {
            margin-top: 0 !important;
        }

        .blue {
            background: #66B6FF;
        }

        .yellow {
            background: #FFE176;

        }

        .red {
            background: #FF7171;

        }

        .orange {
            background: #FFA676;

        }

        .input-wrap {

            .title {

                i {
                    font-size: 15px;
                    color: #ADADAD;
                    font-style: normal;

                }

            }

            section.upload-wrap {

                overflow: hidden;
                margin: 51.5px 0;

                >
                div {
                    width: 33.3333%;
                    text-align: center;
                    float: left;
                    overflow: hidden;

                    img {
                        width: 65px;
                        height: 65px;
                    }

                    p {
                        text-align: center;
                        margin-top: 16.5px;
                    }

                    i.err-tip {
                        font-style: normal;
                        font-size: 13px;
                        color: #FF7979;
                        margin-top: 10px;
                    }

                }
            }

            > p.err-tip {
                text-align: right;
                color: #FF7979;
                margin-top: -18px;
                font-size: 13px;
                padding-right: 10px;
                margin-bottom: 10px;
                display: none;
            }

            #bank-card-tip {
                text-align: left;
                color: #FF7979;
                margin-top: -18px;
                font-size: 13px;
                padding-right: 10px;
                margin-bottom: 10px;
                padding-left: 10px;

                a {
                    color: #74CFD6;
                    float: right;
                }

            }

            #bank-card-tip-content {

                position: relative;
                z-index: 100000;

                .mask {

                    position: fixed;
                    width: 100%;
                    height: 100%;
                    background: #333;
                    top: 0;
                    opacity: 0.6;
                    left: 0;
                }

                >
                section {
                    position: fixed;
                    bottom: 0;
                    height: 350px;
                    z-index: 1002;
                    left: 0;
                    background: #fff;
                    width: 100%;

                    .title {
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        border-bottom: 1px solid #DBDBDB;
                        margin-bottom: 0;
                    }

                    .body {
                        overflow-y: scroll;
                        /*overflow-x: hidden;*/
                        height: 300px;
                    }

                    a, li {
                        display: block;
                        width: 100%;
                        height: 48px;
                        line-height: 48px;
                        border-bottom: 1px solid #DBDBDB;
                        font-size: 16px;
                        color: #383838;
                        text-align: left;
                        /*padding-left: 30px;*/
                        list-style: none;

                        i {
                            font-style: normal;
                            margin-left: 30px;
                        }
                    }

                }

            }

            // 表单输入容器
            > div {
                border-bottom: 1px solid #ADADAD;
                height: 36px;
                line-height: 33px;
                padding-left: 8px;
                margin-bottom: 28px;
                /*padding-right: 8px;*/
                text-align: right;
                font-size: 15px;

                > span {
                    display: inline-block;
                    float: left;
                    line-height: 36px;
                }

                input {
                    display: inline-block;
                    font-size: 15px;
                    margin-left: 0px;
                    padding-right: 8px;
                    border: none;
                    text-align: right;
                    float: right;
                    position: relative;
                    top: 8px;
                    width: 195px;
                }

                b {
                    font-weight: normal;
                    margin-right: 8px;
                }

                img {
                    float: right;
                    width: 10px;
                    position: relative;
                    top: 8px;
                }

            }

            // 禁止表单编辑遮罩
            .unable-mask {
                position: absolute;
                background: #fff;
                width: 100% !important;
                height: 100%;
                z-index: 99999;
                opacity: 0;
            }

            // 风控退回时不可编辑菜单父元素
            .rc-reject-wrap {

                color: #a5a5a5;
                position: relative;

                input {
                    color: #a5a5a5;
                }

            }

            .sub {
                border-bottom: none;
                position: relative;
                padding-left: 0;

                > div {
                    margin-right: 85px;
                    border-bottom: 1px solid #ADADAD;
                    padding-left: 9px;
                    text-align: left;

                    input {
                        width: 125px;
                        padding-right: 10px;
                    }

                }

                #get-cms-code {
                    position: absolute;
                    width: 85px;
                    height: 32px;
                    background: #74CFD6;
                    border: none;
                    border-radius: 5px;
                    color: #fff;
                    font-size: 15px;
                    right: 0;
                    bottom: 1px;

                    &.disabled {
                        background: #fff;
                        border: 1px solid #DBDBDB;
                        color: #DBDBDB;
                    }

                }

                // 屏幕小于 IPHONE5 时
                @media screen and (max-width: 320px) {

                    > div {
                        input {
                            padding-right: 4px;
                        }

                    }
                }

            }

            // 联系人删除按钮
            .contact-del {

                text-align: center;
                color: #74CFD6;
                font-size: 15px;
                margin-bottom: 29px;

                img {
                    width: 15px;
                    position: relative;
                    top: 2px;
                    margin-right: 10px;
                }

            }

        }

        // 子女信息模块
        #child-info {

            section.upload-wrap {

                margin-bottom: 10px;

                > div {

                    margin-left: 10.4444%;
                }

                span {
                    display: block;
                    color: #A0A0A0;
                    font-size: 15px;
                    margin-top: 2px;
                    line-height: 21px;
                }
            }
        }

        // 添加更多联系人
        #add-more {

            color: #74CFD6;
            display: block;
            text-align: center;

            img {
                width: 18px;
                position: relative;
                top: 3px;
                margin-right: 5px;
            }

        }

        .next {
            background: #DBDBDB;
            display: block;
            height: 44px;
            width: 120px;
            margin: 31px auto 0 auto;
            border: none;
            border-radius: 5px;
            color: #fff;
            font-size: 15px;
            position: relative;
            /*z-index: 10002;*/

            &.active {
                background: #74CFD6;
            }

        }

        #upload-mask {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: #333;
            opacity: 0.5;
            display: none;
            z-index: 999999;
        }

        .upload-tip {
            position: fixed;
            width: 100%;
            height: 340px;
            bottom: 0;
            background: #fff;
            text-align: center;
            display: none;
            z-index: 9999999;

            .title {
                height: 50px;
                line-height: 50px;
                color: #383838;
                font-size: 17px;
                text-align: center;
                background: #F1F1F1;
            }

            > img {
                width: 210px;
                margin-top: 31.5px;
            }

            > p {
                margin-top: 25px;
                color: #383838;
                font-size: 14px;
                text-align: center;
            }

            > button {
                margin-top: 32.5px;
                width: 200px;
                border-radius: 5px;
                color: #fff;
                font-size: 16px;
                background: #74CFD6;
                height: 44px;
                border: none;
            }
        }

    }

</style>