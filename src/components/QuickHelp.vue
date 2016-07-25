<template>
  <mt-header title="快捷帮助">
    <mt-button v-link="'/'" icon="back" slot="left"></mt-button>
  </mt-header>
  <ul class="info">
    <li v-for="info in infos">
      <span class="black-font float-left">{{ info.name }}</span>
      <span class="gray-font float-right">{{ info.value }}</span>
    </li>
  </ul>
</template>

<script>
import { Header,Button } from 'mint-ui';
export default {
  data () {
    return {
      infos : [
        { name : '部门名称', value : 'XXXXXX网络部'},
        { name : '部门电话', value : '120130'},
        { name : '部门地址', value : '網絡世界XXX號XXX'},
      ],
    }
  },
  components : {
    mtHeader : Header,
    mtButton : Button,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  background-color: rgb(244,244,244);
}

.info li{
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  
  display: block;
  border-bottom: 1px solid rgb(229,229,229);
  height: 45px;
  width: 100%;
  padding: 0px 15px;
  
  background-color: rgb(255,255,255);
}

.info li span{
  line-height: 45px;
  font-size: 1 rem;
}

.black-font{
  color: rgb(61,61,61);
}

.gray-font{
  color: rgb(174,174,174);
}

.float-left{
  float: left;
}

.float-right{
  float: right;
}

ul{
  margin: 0 0;
  padding: 0 0;  
}

</style>
