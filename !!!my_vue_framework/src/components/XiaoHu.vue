<template>
  <section >
  <!--center部分-->
       <div class="center">
            <!--菜单导航栏-->
          <div class="nav-darw">
            <ul>
              <li class="active">骑员送车<span></span></li>
              <li @click="jumpSearch()">中奖查询<span></span></li>
              <li></li>
            </ul>
          </div>
          <!--抽奖功能-->
         <div class="ac-tivce">
           <div class="ac-img"><img src="../assets/img/draw.png" width="100%" height="100%">
             <span class="des1"><img src="../assets/img/join.png"></span>
           <!--活动说明 开始-->
               <div id="hint" class="pay-masker hide"></div>
                <div id="pay-pops" class="pay-pops1 hide">
                  <div class="dre"><span>X</span></div>
                  <p>1、所有支持7元用户中，每日抽选出2名幸运用户，赠送 SOCO TS800R。</p>
                  <p>2、10月12日~23日开放购买期间可以用7元抵70元优惠券，用于购买产品。</p>
                  <p>3、活动期间内将本活动转发朋友圈，成功累积30个赞，以人人领取SOCO订制手机壳一个，轻松拿奖。</p>
                  <p>4、中奖名单将在活动页面实时更新、敬请关注！有任何疑问，可以随时拨打服务热线电话：400-021-2008 ， 或者进QQ群咨询： 562389202</p>
                </div> 
       <!--活动说明 结束-->
            </div>
       
          <div class="ac-bac">
               <div class="chaxn">
                     <span @click="onclick">查询申请进度</span>
                     <span>立即抽奖</span>
               </div>
               <div class="chaumet">
                   <h2><span></span>中奖列表<span></span></h2>
                    <div id="demo" class="win-conter" style="overflow:hidden;height:500px;">
                    <div id="indemo" style="height:200%;">
                     <div id="demo1">
                       <ul>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800二辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                       </ul>
                     </div>
                       <div id="demo2">
                       <ul>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800二辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                          <li><span>张**</span><span>132****8724</span><span>SOCO</span><span>TS800一辆</span></li>
                       </ul>
                     </div>
                   </div>
                   </div>
               </div>
          </div>
         </div>
       </div>
  </section>
</template>
<script>
  import ajax from 'qwest'
  var $data = {
    name:'',
  }
  var $this = { }
  export default {
    data() {
      $this = this
      return $data
    },
    ready() {},
    methods: {
      login(){
        console.log($data.name)
        var data = {
          name:$data.name
        }
        ajax.post('http://192.168.0.21:8081/proxy/test',data).then(function(_,res){
          var resObj = JSON.parse(res)
          if(resObj.status == 'success'){
            window.layer.tip(resObj.msg)
          }
        })
      },
      onclick(){
        console.log(this.$el.querySelector('#demo1'))
      },
      jumpSearch(){
        location.href = '#!/draw'
      }
    },
    components: {
    },

  }
  </script>
<style lang="css">
</style>
