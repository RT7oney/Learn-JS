<template>
  <section>
    <div class="app-back">
      <list>
        <item-cell  v-for="item in list" v-link="item" link>
          <item-title>{{$key}}</item-title>
        </item-cell>
      </list>
    </div>
  </section>
</template>

<script>
/**
 * 使用到的数据需要显示声明
 */
var $data = {
  list: {
    '小虎': '/xiaohu',
  },
}

export default {
  route: {
    data() { },
  },
  data() {
    return $data;
  },
  ready() { },
  methods: { },
  components: { },
}
</script>

<style lang="css">
.app-back{
  background-color: #fff;
}
</style>