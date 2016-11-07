<template>
  <section>
    <div class="xiaohu-div">
      <form-list>
        <div class="vc-item-form"><div class="vc-item-form-icon" style="margin-top:13px;"> <i class="icon icon-phone" style="font-size: 24px;"></i> </div> <div class="vc-item-form-content"> <label class="vc-text-field"> <input autocomplete="off" type="text" v-model="name" placeholder="请输入你的手机号">  </label> </div> </div>
      </form-list>
      <button v-on:click="login()" class="xiaohu-button" big text="登陆"></button>
    </div>
  </section>
</template>
<script>
  import ajax from 'qwest'
  var $data = {
    name:''
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
      }
    },
    components: {
    },
  }
  </script>
<style lang="css">
.xiaohu-div{
  text-align: center;
  margin-top: 10%;
}
.xiaohu-button{
  letter-spacing: 3px;
  margin: 0 auto;
  color: #fff;
  background-color: #29b6f6;
  width: 80%;
  height: 50px;
}
</style>