<template>
  <section>
  <!--center部分-->
       <div class="center">
            <!--菜单导航栏-->
          <div class="nav-darw">
            <ul>
                <li @click="location()">骑员送车<span></span></li>
                <li class="active">中奖查询<span></span></li>
                <li></li>
             </ul>
          </div>
              <!--抽奖活动专区-->
              <div class="sub-phone">
                   <div class="sub-contact">
                     <small>*<i>手机</i></small>
                     <span style="width: 80%;"><input type="text" id="phone" name="name" class="sub-iptel" value="" placeholder="请填写手机号码"/></span>
                  </div>
                     <div class="sub-query" style="margin-bottom: 2em;"><button type="submit" class="sub-button">查询申请进度</button></div>
                   
                   <div class="sub-cread">
                       <div class="sub-cer">
                           <span><img src="../assets/img/succed-icon.png" width="60%" height="60%" class="img" /></span>
                           <span>恭喜您！获得7元抵70元优惠券</span>
                       </div>
                       <div class="sub-cue">
                         <div class="uba1"><img src="../assets/img/Qing.png" width="99%" ></div>
                         <div class="uba2">
                         <p>活动期间内将本活动转发朋友圈，成功累积30个赞，将截图发送至SOCO电动(微信号为：SOCO_dd），将可以人人领取SOCO订制手机壳一个，轻松拿奖。</p><img src="../assets/img/iphone.png" width="99%"></div>
                         <div class="uba3"><img src="../assets/img/car.png" width="99%"></div>
                        </div>
                      
                   </div>
                  <div class="sub-ping">
                 <p>&nbsp;请填写正确的联系方式，礼品即将10月28日统一发出，
                 请注意查收。欢迎支持SOCO TS城市锂电跨骑车，
                 您的支持是我们继续骑行的动
                  力，想了解更多欢迎登陆:</p>
                      <div><span>SOCO官网:&nbsp;&nbsp;</span><a href="www.supersoco.com"> www.supersoco.com</a></div>
                      <div><span>客服热线:&nbsp;&nbsp;</span><a href="tel:400-021-2008">400-021-2008</a></div>
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
      location(){
         location.href= '#!/xiaohu'
      }
    },
    components: {
    },

  }
  </script>
<style lang="css">
</style>